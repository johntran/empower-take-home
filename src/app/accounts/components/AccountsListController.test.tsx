import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AccountsListController from "./AccountsListController";
import { mockData } from "~/app/api/mockData";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    push: jest.fn(),
  })),
}));

jest.mock("~/app/accounts/hooks/useAccountsQuery", () => ({
  useAccountsQuery: jest.fn().mockImplementation(() => ({
    data: mockData.accounts,
    isPending: false,
    error: null,
  })),
}));

describe("AccountsListController", () => {
  const queryClient = new QueryClient();

  it("displays account information", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <AccountsListController />
      </QueryClientProvider>,
    );

    // Check for the presence of account names and balances
    for (const account of mockData.accounts) {
      expect(screen.getByText(account.name)).toBeInTheDocument();
      expect(
        screen.getByText(`$${account.balances.available.toFixed(2)}`),
      ).toBeInTheDocument();
    }
  });
});
