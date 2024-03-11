import { type TransformedTransaction } from "~/app/transactions/[accountId]/hooks/selectTransactionsData";
type TransactionsListProps = {
  transactions: TransformedTransaction[];
  isPending: boolean;
};

export const TransactionsList = ({
  transactions,
  isPending,
}: TransactionsListProps) => {
  if (isPending) {
    throw new Promise(() => {
      return;
    });
  }

  return (
    <div>
      <ul className="transactionList">
        {transactions.map((transaction, index) => (
          <li
            className="transactionsListItem"
            key={`${transaction.amount}+${index}`}
          >
            <div className="transactionListItem-detailsContainer">
              <h3>{transaction.name}</h3> <div>Date: {transaction.date}</div>
              <div>Category: {transaction.category.join(", ")}</div>
            </div>
            <p className="transactionsListItem-amount">${transaction.amount}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
