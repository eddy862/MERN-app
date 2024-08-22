import ParentCategory, {
  IParentCategory,
} from "../../models/parentCategory.model";

const predefinedParentCategories: Partial<IParentCategory>[] = [
  {name: "Food & drink", color: "red"},
  {name: "Shopping", color: "orange"},
  {name: "Entertainment", color: "yellow"},
  {name: "Transportation", color: "green"},
  {name: "Education", color: "pink"},
  {name: "Other", color: "gray"},
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
