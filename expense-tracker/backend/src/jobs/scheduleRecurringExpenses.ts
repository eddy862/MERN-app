import cron from "node-cron"
import { processFixedExpenses } from "../utils/fixedExpense"

cron.schedule("0 0 * * *", async () => {
  await processFixedExpenses();
});