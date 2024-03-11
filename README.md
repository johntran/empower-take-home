# John Tran - Empower Spend Tracking

## Things to Note

- Unit tests for each user story
  - Viewing bank accounts: `src/app/accounts/components/AccountsListController.test.tsx`
  - Viewing transaction history: `src/app/transactions/[accountId]/components/TransactionsListController.test.tsx`
  - Create, view, udpate, remove spend trackers and visualize spend: `src/app/trackers/components/TrackersListController.test.tsx`

## How it works

- I used a [backend-for-frontend](https://learn.microsoft.com/en-us/azure/architecture/patterns/backends-for-frontends) architecture for the API routes
  - I created API endpoints specifically to render a page the most efficiently as possible.

Load waterfall

Accounts Page:

1. Hit API endpoint to get the following data:

- Bank accounts
  - id, Name, type, last 4, balance, currency
- Transactions
  - id, amount, date, description, category, account_id
- Categories
  - id, name, color

In a production setting, there would be separate endpoint for grabbing accounts and transactions.

## How I would've done things differently

- Used a CSS library
  - I chose to use vanilla CSS to show my CSS skills. But in a production setting, I would use a CSS library like Tailwind becasuse it requires less work to create better UIs. I could also use a zero-runtime CSS-in-JS library like Linaria, but it would take significant time setting that up in Webpack.
