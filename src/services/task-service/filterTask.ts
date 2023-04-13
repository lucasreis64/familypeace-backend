import { taskFilterParams, taskWhereParams } from "@/protocols";

export function filterTask(body: taskFilterParams, familyId: number): taskWhereParams {
  const { period, status, from } = body;
  const whereInput: taskWhereParams = { familyId };
  const actualDate = new Date();

  if (period === "day") {
    const lastDay = new Date(actualDate.getTime() - 24 * 60 * 60 * 1000);
    
    whereInput.createdAt = { gte: lastDay };
  }

  if (period === "week") {
    const lastWeek = new Date(actualDate.getTime() - 7 * 24 * 60 * 60 * 1000);
    whereInput.createdAt = { gte: lastWeek };
  }

  if (period === "month") {
    const lastMonth = new Date(actualDate.getTime() - 30 * 24 * 60 * 60 * 1000);
    whereInput.createdAt = { gte: lastMonth };
  }

  if (typeof from === "number")
    whereInput.taskMembers.every.userId = from;

  if (status !== "all")
    whereInput.status = status;

  return whereInput;
}
