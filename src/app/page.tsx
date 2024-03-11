"use client";

import AccountsListController from "~/app/accounts/components/AccountsListController";

export default function HomePage() {
  return (
    <main>
      <h2>All accounts</h2>
      <AccountsListController />
    </main>
  );
}
