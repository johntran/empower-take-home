"use client";
import { TrackersListController } from "~/app/trackers/components/TrackersListController";

import * as React from "react";

export default function SpendTrackerPage({}) {
  return (
    <div className="spendTracker">
      <div>
        <h2>Spend Trackers</h2>
      </div>
      <TrackersListController />
    </div>
  );
}
