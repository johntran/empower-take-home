import { type Account } from "../hooks/useAccountsQuery";

export type TransformedAccountData = {
  accountId: string;
  balances: {
    available: string | null;
    current: string | null;
    isoCurrencyCode: string | null;
    unofficialCurrencyCode: string | null;
  };
  mask: string;
  name: string;
  officialName: string | null;
  subtype: string;
  type: string;
};

export const selectAccountData = (
  accounts: Account[],
): TransformedAccountData[] => {
  if (!accounts) return [];
  return accounts.map((account) => {
    const { available, current, iso_currency_code, unofficial_currency_code } =
      account.balances;

    const camelCaseBalances = {
      available: available.toFixed(2),
      current: current.toFixed(2),
      isoCurrencyCode: iso_currency_code,
      unofficialCurrencyCode: unofficial_currency_code,
    };

    return {
      accountId: account.account_id,
      balances: camelCaseBalances,
      mask: account.mask,
      name: account.name,
      officialName: account.official_name,
      subtype: account.subtype,
      type: account.type.charAt(0).toUpperCase() + account.type.slice(1),
    };
  });
};
