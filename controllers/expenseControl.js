import generateUniqueId from "generate-unique-id";
class Expense {
  static async createExpense(db,obj) {
    try {
      const newExpense = await db.expense.create(obj);
      return newExpense;
    } catch (err) {
      console.log("error while creating newExpense:", err);
      throw err;
    }
  }
}
export default Expense;
