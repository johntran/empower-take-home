/* eslint-disable @next/next/no-img-element */
import { type TransformedAccountData } from "~/app/accounts/hooks/selectAccountData";
import * as React from "react";
import { useRouter } from "next/navigation";

type AccountsListProps = {
  accounts: TransformedAccountData[];
  isPending: boolean;
};

export const AccountsList = ({ accounts, isPending }: AccountsListProps) => {
  const router = useRouter();
  if (isPending) {
    throw new Promise(() => {
      return;
    });
  }
  const handleAccountClick = React.useCallback(
    (accountId: string) => {
      void router.push(`/transactions/${accountId}`);
    },
    [router],
  );
  return (
    <div>
      <ul className="accountList">
        {accounts.map((account) => (
          <li
            className="accountsListItem"
            key={account.accountId}
            onClick={() => handleAccountClick(account.accountId)}
          >
            <img
              className="img-thumbnail"
              src="https://xsgames.co/randomusers/avatar.php?g=pixel"
              alt="User avatar"
            />
            <div className="accountListItem-nameContainer">
              <h3>{account.name}</h3>
              <div>{account.type}</div>
            </div>
            <p className="accountstListItem-balance">
              ${account.balances.available}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
