import { CloseSmall } from "@icon-park/react";
import { ICategory } from "../../types/categories";
import FixedItemCategoryList from "./FixedItemCategoryList";

type Props = {
  onClose: () => void;
  expenseCategories: ICategory[];
  incomeCategories: ICategory[];
  selectedCategory: ICategory | null;
  setSelectedCategory: (id: string) => void;
};

const SelectFixedItemCategory = ({
  onClose,
  expenseCategories,
  incomeCategories,
  selectedCategory,
  setSelectedCategory,
}: Props) => {
  if (!selectedCategory) return null;

  return (
    <div className="relative pt-4">
      <CloseSmall
        theme="outline"
        size="24"
        fill="#333"
        className="cursor-pointer absolute top-0 right-0"
        onClick={onClose}
      />

      <div className="max-h-[60vh] overflow-y-auto flex flex-col gap-3">
        <FixedItemCategoryList categories={expenseCategories} categoriesType="expense" setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} />

        <FixedItemCategoryList categories={incomeCategories} categoriesType="income" setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} />
      </div>
    </div>
  );
};

export default SelectFixedItemCategory;
