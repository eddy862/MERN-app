import Category, { ICategory } from "../../models/category.model";
import ParentCategory from "../../models/parentCategory.model";

export const seedCategories = async () => {
  try {
    const parentCategories = await ParentCategory.find({});
    if (parentCategories.length === 0) {
      throw new Error("No parent categories found");
    }

    const parentCategoryMap = new Map(
      parentCategories.map((category) => [category.name, category._id])
    );

    const foodAndDrinksId = parentCategoryMap.get("Food & drink");
    const shoppingId = parentCategoryMap.get("Shopping");
    const entertainmentId = parentCategoryMap.get("Entertainment");
    const transportId = parentCategoryMap.get("Transportation");
    const educationId = parentCategoryMap.get("Education");
    const otherId = parentCategoryMap.get("Other");

    if (
      !(
        foodAndDrinksId &&
        shoppingId &&
        entertainmentId &&
        transportId &&
        educationId &&
        otherId
      )
    ) {
      throw new Error("Some parent categories are missing");
    }

    const predefinedCategories = [
      { name: "Breakfast", parentCategory: foodAndDrinksId },
      { name: "Lunch", parentCategory: foodAndDrinksId },
      { name: "Dinner", parentCategory: foodAndDrinksId },

      { name: "Groceries", parentCategories: shoppingId },
      { name: "Clothing", parentCategories: shoppingId },

      { name: "Games", parentCategories: entertainmentId },
      { name: "Movies", parentCategories: entertainmentId },

      { name: "Gas", parentCategories: transportId },
      { name: "Public Transit", parentCategories: transportId },

      { name: "Tuition", parentCategories: educationId },
      { name: "Books & Supplies", parentCategories: educationId },

      { name: "Miscellaneous", parentCategories: otherId },
      { name: "Donations", parentCategories: otherId },
    ]; // add icons

    await Category.deleteMany({ predefined: true });
    console.log("Predefined categories in the collection cleared");

    await Category.insertMany(predefinedCategories);
    console.log("Predefined categories seeded");
  } catch (err) {
    console.log("Error seeding categories: ", err);
  }
};
