/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";

const maxLength = 15; // Maximum length of the string after truncation

export const AddTrackerView = ({
  categories,
  onAdd,
  tracker,
  onBack,
}: {
  tracker: any;
  onAdd: (input: { category: string; interval: string; limit: number }) => void;
  onBack: () => void;
  categories: string[];
}) => {
  const [selectedCategory, setSelectedCategory] = React.useState<string>(
    tracker?.category ?? "",
  );
  const [time, setTime] = React.useState<string>(tracker?.interval ?? "");

  return (
    <div className="spendTracker-add">
      <button onClick={onBack}>Back to list</button>
      <form
        onSubmit={(event) => {
          event?.preventDefault();
          const form = event.target;
          // @ts-expect-error: form is untyped
          const formData = new FormData(form);
          onAdd({
            category: selectedCategory,
            interval: time,
            limit: parseFloat(formData.get("spend-limit") as string),
          });
          setSelectedCategory("");
          setTime("");
        }}
      >
        <div>
          <label htmlFor="spend-limit-input">Spend Limit</label>
          <input
            id="spend-limit-input"
            name="spend-limit"
            type="text"
            defaultValue={tracker?.limit}
            required
          />
        </div>
        <div className="spendTracker-row">
          <label htmlFor="categories-input">Categories</label>
          <div>
            {selectedCategory ? (
              <button onClick={() => setSelectedCategory("")}>
                {selectedCategory.length > maxLength
                  ? selectedCategory.slice(0, maxLength - 3) + "..."
                  : selectedCategory}
              </button>
            ) : (
              categories.map((category) => {
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category.length > maxLength
                      ? category.slice(0, maxLength - 3) + "..."
                      : category}
                  </button>
                );
              })
            )}
          </div>
          <div>
            <label htmlFor="time-input">How often?</label>
            <div>
              {time ? (
                <button
                  onClick={(event) => {
                    event?.preventDefault();
                    setTime("");
                  }}
                >
                  {time}
                </button>
              ) : (
                <>
                  <button
                    onClick={(event) => {
                      event?.preventDefault();
                      setTime("week");
                    }}
                  >
                    Weekly
                  </button>
                  <button
                    onClick={(event) => {
                      event?.preventDefault();
                      setTime("month");
                    }}
                  >
                    Monthly
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        <button>Finish</button>
      </form>
    </div>
  );
};
