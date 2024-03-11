import { ProgressBar } from "./ProgressBar";

export const TrackersList = ({
  trackers,
  isPending,
  handleGoToAdd,
  onRemove,
  onUpdate,
}: {
  trackers: {
    category: string;
    limit: string;
    total: string;
    interval: string;
  }[];
  isPending: boolean;
  handleGoToAdd: () => void;
  onRemove: (category: string) => void;
  onUpdate: (category: string) => void;
}) => {
  if (isPending) {
    throw new Promise(() => {
      return;
    });
  }

  return (
    <div>
      <button className="clickable" onClick={handleGoToAdd}>
        + Add Tracker
      </button>
      <ul className="trackerList">
        {trackers.map((tracker, index) => (
          <li className="trackerListItem" key={`${tracker.limit}+${index}`}>
            <div className="trackerListItem-detailsContainer">
              <div className="trackerListItem-left">
                <h3>{tracker.category}</h3>
                <ProgressBar
                  value={
                    (parseFloat(tracker.total) /
                      parseFloat(tracker.limit.toString())) *
                    100
                  }
                />
              </div>
              <div className="trackerListItem-right">
                <div>${tracker.total}</div>
                <div>
                  of ${tracker.limit} / {tracker.interval}
                </div>
              </div>
            </div>
            <div>
              <button onClick={() => onRemove(tracker.category)}>Remove</button>
              <button onClick={() => onUpdate(tracker.category)}>Update</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
