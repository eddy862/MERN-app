import cron from "node-cron";
import { processFixedItems } from "../utils/fixedItem";

cron.schedule("0 0 * * *", async () => {
  await processFixedItems();
});
