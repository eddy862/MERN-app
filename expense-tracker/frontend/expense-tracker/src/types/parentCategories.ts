export interface IParentCategory {
  _id: string;
  name: string;
  type: "income" | "expense";
  createdAt: Date;
}