import { useQuery } from "@tanstack/react-query";
import { type Transaction } from "~/app/transactions/[accountId]/hooks/useTransactionsQuery";

export type Output = {
  categories: string[];
  trackers: { category: string; limit: number; interval: string }[];
  transactions: Transaction[];
};

const fetchTrackers = () =>
  fetch(`/api/spendTracker/`).then((res) => {
    return res.json() as Promise<Output>;
  });

export const useTrackersQuery = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["trackers"],
    queryFn: fetchTrackers,
  });
  return { data, error, isPending };
};
