import ParentCategory, {
  IParentCategory,
} from "../../models/parentCategory.model";

const predefinedParentCategories: Partial<IParentCategory>[] = [
  {name: "Food & drink", type: "expense"},
  {name: "Shopping", type: "expense"},
  {name: "Entertainment", type: "expense"},
  {name: "Transportation", type: "expense"},
  {name: "Education", type: "expense"},
  {name: "Other", type: "expense"},
  {name: "Salary", type: "income"},
  {name: "Business", type: "income"},
  {name: "Investment", type: "income"},
  {name: "Other", type: "income"},
];

export const seedParentCategories = async () => {
  try {
    await ParentCategory.deleteMany({});
    console.log("Parent categories collection cleared");

    await ParentCategory.insertMany(predefinedParentCategories);
    console.log("Predefined parent categories seeded");
  } catch (err) {
    console.error("Error seeding parent categories:", err);
  }
};
