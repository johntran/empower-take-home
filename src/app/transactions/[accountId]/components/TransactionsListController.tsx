import { Suspense } from "react";
import { useTransactionsQuery } from "~/app/transactions/[accountId]/hooks/useTransactionsQuery";
import { selectTransactionsData } from "~/app/transactions/[accountId]/hooks/selectTransactionsData";
import { TransactionsList } from "./TransactionsList";

export const TransactionsListController = ({
  accountId,
}: {
  accountId: string;
}) => {
  const { data, isPending } = useTransactionsQuery(accountId);
  const transactions = data ? selectTransactionsData(data) : [];
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TransactionsList transactions={transactions} isPending={isPending} />
    </Suspense>
  );
};
