export interface ICategory {
  _id: string
  name: string;
  user?: string;
  predefined: boolean;
  type: "income" | "expense";
  icon: string;
  parentCategory: string;
  createdAt: Date;
}