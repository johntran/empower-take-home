import { type Transaction } from "~/app/transactions/[accountId]/hooks/useTransactionsQuery";

export type TransformedTransaction = {
  accountId: string;
  amount: string;
  isoCurrencyCode: string;
  category: string[];
  date: string;
  name: string;
};

export const selectTransactionsData = (
  transactions: Transaction[],
): TransformedTransaction[] => {
  if (!transactions) return [];
  const sortedTransactions = transactions.sort((a, b) => {
    return b.date.localeCompare(a.date);
  });
  return sortedTransactions.map((transaction) => {
    return {
      accountId: transaction.account_id,
      amount: transaction.amount.toFixed(2),
      isoCurrencyCode: transaction.iso_currency_code,
      category: transaction.category,
      date: transaction.date,
      name: transaction.name,
    };
  });
};
