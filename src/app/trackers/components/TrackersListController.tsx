/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Suspense, useEffect, useState } from "react";
import { useTrackersQuery } from "~/app/trackers/hooks/useTrackersQuery";
import {
  selectTransactionsData,
  type TransformedTransaction,
} from "~/app/transactions/[accountId]/hooks/selectTransactionsData";
import { TrackersList } from "./TrackersList";
import { AddTrackerView } from "./AddTrackerView";

type Tracker = {
  category: string;
  limit: string;
  total: string;
  interval: string;
};

function updateTrackers(
  trackers: { category: string; limit: number; interval: string }[],
  transactions: TransformedTransaction[],
) {
  const todaysDate = new Date("2023-09-28");

  return trackers.map((tracker) => {
    // Calculate the start date based on the interval
    const startDate = new Date(todaysDate);
    if (tracker.interval === "week") {
      startDate.setDate(todaysDate.getDate() - 7);
    } else if (tracker.interval === "month") {
      startDate.setMonth(todaysDate.getMonth() - 1);
    }

    const total = transactions.reduce((acc, transaction) => {
      const transactionDate = new Date(transaction.date);
      if (
        transaction.category.includes(tracker.category) &&
        transactionDate >= startDate
      ) {
        return acc + parseFloat(transaction.amount);
      }
      return acc;
    }, 0);
    return {
      ...tracker,
      total: total.toFixed(2),
      limit: tracker.limit.toFixed(2),
    };
  });
}

export const TrackersListController = () => {
  const { data, isPending } = useTrackersQuery();
  const [categories, setCategories] = useState<string[]>([]);
  const [trackers, setTrackers] = useState<Tracker[]>([]);
  const [transactions, setTransactions] = useState<TransformedTransaction[]>(
    [],
  );
  const [view, setView] = useState<"list" | "add">("list");
  const [tracker, setTracker] = useState<Tracker | null>(null);

  useEffect(() => {
    if (data) {
      const transactionsUpdated = selectTransactionsData(data.transactions);
      setTrackers(() => updateTrackers(data.trackers, transactionsUpdated));
      setTransactions(() => transactionsUpdated);
      setCategories(() =>
        data.categories.filter((category) => {
          return !data.trackers.find(
            (tracker) => tracker.category === category,
          );
        }),
      );
    }
  }, [data]);

  const handleGoToAdd = () => {
    setView("add");
  };

  const handleGoToList = () => {
    setView("list");
    setTracker(null);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAddTracker = (newTracker: any) => {
    setTrackers((trackers) =>
      updateTrackers(
        [
          ...trackers.filter(
            (tracker) => tracker.category !== newTracker.category,
          ),
          newTracker,
        ].map((tracker) => ({
          ...tracker,
          limit: parseFloat(tracker.limit),
        })),
        transactions,
      ),
    );
    setCategories((categories) =>
      categories.filter((category) => {
        return !trackers.find(
          (tracker) =>
            tracker.category === category || newTracker.category === category,
        );
      }),
    );
    handleGoToList();
  };

  const handleRemoveTracker = (category: string) => {
    setTrackers((trackers) =>
      updateTrackers(
        trackers
          .filter((tracker) => {
            return tracker.category !== category;
          })
          .map((tracker) => ({ ...tracker, limit: parseFloat(tracker.limit) })),
        transactions,
      ),
    );
    setCategories((categories) => [...categories, category]);
  };

  const handleUpdateTracker = (category: string) => {
    const tracker = trackers.find((tracker) => tracker.category === category);
    setTracker(tracker!);
    setView("add");
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {view === "list" && (
        <TrackersList
          trackers={trackers}
          isPending={isPending}
          handleGoToAdd={handleGoToAdd}
          onRemove={handleRemoveTracker}
          onUpdate={handleUpdateTracker}
        />
      )}
      {view === "add" && (
        <AddTrackerView
          tracker={tracker}
          onAdd={handleAddTracker}
          onBack={handleGoToList}
          categories={categories}
        />
      )}
    </Suspense>
  );
};
