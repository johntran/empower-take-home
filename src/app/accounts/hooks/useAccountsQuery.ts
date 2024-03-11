import { useQuery } from "@tanstack/react-query";

export type Account = {
  account_id: string;
  balances: {
    available: number;
    current: number;
    iso_currency_code: string;
    limit: null;
    unofficial_currency_code: null;
  };
  mask: string;
  name: string;
  official_name: string;
  subtype: string;
  type: string;
};

const fetchAccounts = () =>
  fetch("/api/accounts").then((res) => {
    return res.json() as Promise<Account[]>;
  });

export const useAccountsQuery = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["accounts"],
    queryFn: fetchAccounts,
  });
  return { data, error, isPending };
};
