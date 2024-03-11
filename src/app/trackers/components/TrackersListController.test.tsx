/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { TrackersListController } from "./TrackersListController";
import { useTrackersQuery } from "~/app/trackers/hooks/useTrackersQuery";
import { ProgressBar } from "./ProgressBar";
import { selectTransactionsData } from "~/app/transactions/[accountId]/hooks/selectTransactionsData";

// Mock the hooks
jest.mock("~/app/trackers/hooks/useTrackersQuery", () => ({
  useTrackersQuery: jest.fn(),
}));

jest.mock(
  "~/app/transactions/[accountId]/hooks/selectTransactionsData",
  () => ({
    selectTransactionsData: jest.fn(),
  }),
);

describe("TrackersListController", () => {
  const mockTrackers = [
    { category: "Food", limit: 100, interval: "week", total: "50" },
    { category: "Entertainment", limit: 200, interval: "month", total: "150" },
  ];

  const mockTransactions = [
    { date: "2023-09-20", category: "Food", amount: "30" },
    { date: "2023-09-21", category: "Entertainment", amount: "150" },
    { date: "2023-09-21", category: "Grocery", amount: "150" },
  ];

  beforeEach(() => {
    (useTrackersQuery as jest.Mock).mockReturnValue({
      data: {
        trackers: mockTrackers,
        transactions: mockTransactions,
        categories: ["Food", "Entertainment", "Utilities", "Grocery"],
      },
      isPending: false,
    });

    (selectTransactionsData as jest.Mock).mockReturnValue(mockTransactions);
  });

  it("VIEW: displays the list of trackers and **visualize spend**", async () => {
    render(<TrackersListController />);
    await waitFor(() => {
      expect(screen.getByText("Food")).toBeInTheDocument();
      expect(screen.getByText("Entertainment")).toBeInTheDocument();
      const progressBars = screen.getAllByRole("progressbar");
      expect(progressBars[0]!.style.width).toBe("0%");
      expect(progressBars[1]!.style.width).toBe("75%");
    });
  });

  it("CREATE: can add tracker", async () => {
    render(<TrackersListController />);
    fireEvent.click(screen.getByText("+ Add Tracker"));
    // Select a category
    fireEvent.click(screen.getByText("Grocery"));
    // Set a time interval
    fireEvent.click(screen.getByText("Weekly"));
    // Input a spend limit
    fireEvent.change(screen.getByLabelText("Spend Limit"), {
      target: { value: "100" },
    });
    // Submit the form
    fireEvent.click(screen.getByText("Finish"));
    await waitFor(() => {
      expect(screen.getByText("Grocery")).toBeInTheDocument();
    });
  });

  it("REMOVE: can remove tracker", async () => {
    const { getAllByText } = render(<TrackersListController />);
    // Assuming "Remove" is the text on the button
    expect(screen.getByText("Food")).toBeInTheDocument();
    const removeButtons = getAllByText("Remove");
    // Simulate click on the first tracker's remove button
    if (removeButtons.length > 0) {
      fireEvent.click(removeButtons[0]!);
      await waitFor(() => {
        expect(screen.queryByText("Food")).not.toBeInTheDocument();
      });
    } else {
      throw new Error("No remove buttons found");
    }
  });

  it("UPDATE: can update tracker total", async () => {
    const { getAllByText } = render(<TrackersListController />);
    // Assuming "Remove" is the text on the button
    expect(screen.getByText("Food")).toBeInTheDocument();
    const updateButtons = getAllByText("Update");
    // Simulate click on the first tracker's remove button
    if (updateButtons.length > 0) {
      fireEvent.click(updateButtons[0]!);
      fireEvent.change(screen.getByLabelText("Spend Limit"), {
        target: { value: "2000" },
      });
      // Submit the form
      fireEvent.click(screen.getByText("Finish"));
      await waitFor(() => {
        expect(screen.queryByText("of $2000.00 / week")).toBeInTheDocument();
      });
    } else {
      throw new Error("No update buttons found");
    }
  });
});
