import React, { useCallback, useEffect, useRef } from "react";
import { IBudget, IBudgetsFilter } from "../../types/budgets";
import BudgetItem from "./BudgetItem";

type Props = {
  budgets: IBudget[];
  handleEditModalOpen: (budget: IBudget) => void;
  fetchBudgets: (filter?: IBudgetsFilter, reset?: boolean) => Promise<void>;
  loading: boolean;
  hasMore: boolean;
};

const BudgetList = ({
  budgets,
  handleEditModalOpen,
  fetchBudgets,
  loading,
  hasMore,
}: Props) => {
  const spinnerRef = useRef(null);

  // Intersection observer callback
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !loading) {
        fetchBudgets();
      }
    },
    [loading, hasMore]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null, // Use the viewport as the root
      rootMargin: "20px", // Start fetching before the spinner is fully visible
      threshold: 0.1, // Trigger when x% of the spinner is visible
    });

    if (spinnerRef.current) {
      observer.observe(spinnerRef.current); // Start observing the spinner
    }

    return () => {
      if (spinnerRef.current) {
        observer.unobserve(spinnerRef.current); // Clean up observer
      }
    };
  }, [handleObserver]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <>
      {budgets.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 pb-16">
          {budgets.map((budget) => (
            <BudgetItem
              key={budget._id}
              budget={budget}
              handleEditModalOpen={handleEditModalOpen}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No budgets found</p>
      )}

      <div ref={spinnerRef}>
        {hasMore && loading && (
          <p className="text-center text-gray-500">Loading...</p>
        )}
      </div>
    </>
  );
};

export default BudgetList;
