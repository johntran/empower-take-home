import { useQuery } from "@tanstack/react-query";

export type Transaction = {
  account_id: string;
  amount: number;
  iso_currency_code: string;
  category: string[];
  date: string;
  name: string;
};

const fetchTransactions = (accountId: string) =>
  fetch(`/api/transactions/${accountId}`).then((res) => {
    return res.json() as Promise<Transaction[]>;
  });

export const useTransactionsQuery = (accountId: string) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["transactions", accountId],
    queryFn: () => fetchTransactions(accountId),
  });
  return { data, error, isPending };
};
