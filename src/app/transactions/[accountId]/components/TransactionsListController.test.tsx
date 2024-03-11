import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import { TransactionsList } from "./TransactionsList";

describe("TransactionsList", () => {
  const mockTransactions = [
    {
      accountId: "1",
      name: "Grocery Store",
      date: "2023-01-01",
      category: ["Food", "Groceries"],
      amount: "150.00",
      isoCurrencyCode: "USD",
    },
    {
      accountId: "1",
      name: "Electricity Bill",
      date: "2023-01-02",
      category: ["Utilities"],
      amount: "75.00",
      isoCurrencyCode: "USD",
    },
  ];

  it("renders a list of transactions", () => {
    render(
      <TransactionsList transactions={mockTransactions} isPending={false} />,
    );

    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(mockTransactions.length);
  });

  it("displays the correct transaction details", () => {
    render(
      <TransactionsList transactions={mockTransactions} isPending={false} />,
    );

    expect(screen.getByText("Grocery Store")).toBeInTheDocument();
    expect(screen.getByText("Date: 2023-01-01")).toBeInTheDocument();
    expect(screen.getByText("Category: Food, Groceries")).toBeInTheDocument();
    expect(screen.getByText("$150.00")).toBeInTheDocument();
  });
});
