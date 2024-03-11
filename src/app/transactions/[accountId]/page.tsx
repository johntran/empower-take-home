"use client";
import { TransactionsListController } from "~/app/transactions/[accountId]/components/TransactionsListController";
import { useRouter } from "next/navigation";
import * as React from "react";

export default function TransactionsPage({
  params,
}: {
  params: { accountId: string };
}) {
  const router = useRouter();

  const handleBackClick = React.useCallback(() => {
    void router.push(`/`);
  }, [router]);
  return (
    <div>
      <div>
        <button onClick={handleBackClick}>Back</button>
        <h2>All transactions</h2>
      </div>
      <TransactionsListController accountId={params.accountId} />
    </div>
  );
}
