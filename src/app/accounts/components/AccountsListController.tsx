import { Suspense } from "react";
import { useAccountsQuery } from "../hooks/useAccountsQuery";
import { selectAccountData } from "../hooks/selectAccountData";
import { AccountsList } from "./AccountsList";

export const AccountsListController = ({}) => {
  const { data, isPending } = useAccountsQuery();
  const accounts = data ? selectAccountData(data) : [];
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AccountsList accounts={accounts} isPending={isPending} />
    </Suspense>
  );
};

export default AccountsListController;
