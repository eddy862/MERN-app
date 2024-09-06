import { Schema } from "mongoose";
import Category, { ICategory } from "../../models/category.model";
import ParentCategory from "../../models/parentCategory.model";

export const seedCategories = async () => {
  if (await Category.countDocuments({}) === 0) {
    try {
      const parentCategories = await ParentCategory.find({});
    if (parentCategories.length === 0) {
      throw new Error("No parent categories found");
    }

    const parentCategoryMap = new Map(
      parentCategories.map((category) => [
        `${category.name}-${category.type}`,
        category._id,
      ])
    );

    const foodAndDrinksId = parentCategoryMap.get(
      "Food & drink-expense"
    ) as Schema.Types.ObjectId;
    const shoppingId = parentCategoryMap.get(
      "Shopping-expense"
    ) as Schema.Types.ObjectId;
    const entertainmentId = parentCategoryMap.get(
      "Entertainment-expense"
    ) as Schema.Types.ObjectId;
    const transportId = parentCategoryMap.get(
      "Transportation-expense"
    ) as Schema.Types.ObjectId;
    const educationId = parentCategoryMap.get(
      "Education-expense"
    ) as Schema.Types.ObjectId;
    const otherExpId = parentCategoryMap.get(
      "Other-expense"
    ) as Schema.Types.ObjectId;

    const salaryId = parentCategoryMap.get(
      "Salary-income"
    ) as Schema.Types.ObjectId;
    const businessId = parentCategoryMap.get(
      "Business-income"
    ) as Schema.Types.ObjectId;
    const investmentId = parentCategoryMap.get(
      "Investment-income"
    ) as Schema.Types.ObjectId;
    const otherIncId = parentCategoryMap.get(
      "Other-income"
    ) as Schema.Types.ObjectId;

    if (
      !(
        foodAndDrinksId &&
        shoppingId &&
        entertainmentId &&
        transportId &&
        educationId &&
        otherExpId &&
        salaryId &&
        businessId &&
        investmentId &&
        otherIncId
      )
    ) {
      throw new Error("Some parent categories are missing");
    }

    const predefinedCategories: Partial<ICategory>[] = [
      {
        name: "Breakfast",
        parentCategory: foodAndDrinksId,
        icon: "breakfast.png",
        predefined: true,
        type: "expense",
      },
      {
        name: "Lunch",
        parentCategory: foodAndDrinksId,
        icon: "lunch.png",
        predefined: true,
        type: "expense",
      },
      {
        name: "Dinner",
        parentCategory: foodAndDrinksId,
        icon: "dinner.png",
        predefined: true,
        type: "expense",
      },

      {
        name: "Groceries",
        parentCategory: shoppingId,
        icon: "groceries.png",
        predefined: true,
        type: "expense",
      },
      {
        name: "Clothing",
        parentCategory: shoppingId,
        icon: "clothing.png",
        predefined: true,
        type: "expense",
      },

      {
        name: "Games",
        parentCategory: entertainmentId,
        icon: "games.png",
        predefined: true,
        type: "expense",
      },
      {
        name: "Movies",
        parentCategory: entertainmentId,
        icon: "movies.png",
        predefined: true,
        type: "expense",
      },

      {
        name: "Gas",
        parentCategory: transportId,
        icon: "gas.png",
        predefined: true,
        type: "expense",
      },
      {
        name: "Public Transit",
        parentCategory: transportId,
        icon: "public-transit.png",
        predefined: true,
        type: "expense",
      },

      {
        name: "Tuition",
        parentCategory: educationId,
        icon: "tuition.png",
        predefined: true,
        type: "expense",
      },
      {
        name: "Books & Supplies",
        parentCategory: educationId,
        icon: "books.png",
        predefined: true,
        type: "expense",
      },

      {
        name: "Miscellaneous",
        parentCategory: otherExpId,
        icon: "miscellaneous.png",
        predefined: true,
        type: "expense",
      },
      {
        name: "Donations",
        parentCategory: otherExpId,
        icon: "donations.png",
        predefined: true,
        type: "expense",
      },

      {
        name: "Salary",
        parentCategory: salaryId,
        icon: "salary.png",
        predefined: true,
        type: "income",
      },
      {
        name: "Business",
        parentCategory: businessId,
        icon: "business.png",
        predefined: true,
        type: "income",
      },
      {
        name: "Investment",
        parentCategory: investmentId,
        icon: "investment.png",
        predefined: true,
        type: "income",
      },
      {
        name: "Gifts",
        parentCategory: otherIncId,
        icon: "gifts.png",
        predefined: true,
        type: "income",
      },
    ];

    await Category.deleteMany({ predefined: true });
    console.log("Predefined categories in the collection cleared");

    await Category.insertMany(predefinedCategories);
    console.log("Predefined categories seeded");
  } catch (err) {
      console.log("Error seeding categories: ", err);
    }
  }
};
