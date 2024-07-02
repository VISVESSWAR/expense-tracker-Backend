import db from "../models/db.js";
import express from "express";
import generateUniqueId from "generate-unique-id";
import Expense from "../controllers/expenseControl.js";
import { json } from "sequelize";
import expense from "../models/expense.js";

const router = express.Router();
router.use(express.json());

router.post("/add", async (req, res) => {
  const orderId = generateUniqueId({
    length: 6,
    useNumbers: true,
    useLetters: false,
  });
  console.log(req.body);
  const exp = {
    id: orderId,
    name: req.body.name,
    category: req.body.category,
    amount: req.body.amount,
    date: req.body.date,
  };
  try {
    const creation = await Expense.createExpense(db, exp);
    if (creation) {
      res.status(200).json({ message: "successfully added expense" });
    } else {
      res.status(500).json({ message: "failed to add the expense" });
    }
  } catch (err) {
    console.log("error experienced is:", err);
    res.status(505).json({ errror: "internal server error" });
  }
});

router.get("/viewAll", async (req, res) => {
  console.log("request to fetch all data");
  try {
    const data = await db.sequelize.query(
      "SELECT id,name,category,date,amount from expenses"
    );
    if (data) {
      res.status(200).json(data[0]);
    } else {
      res.status(500).json({ message: "not able to fetch details" });
    }
  } catch (err) {
    console.error("error occured while fetching data in backend", err);
    res.status(505).json({ error: "inernal server error" });
  }
});

router.get("/view/:category/:month/:year", async (req, res) => {
  const { category, month, year } = req.params;
  let query = "SELECT id, name, category, date, amount FROM expenses WHERE 1=1";// '1==1' added to balance the select statement
  if (category !== "all") {//"all"-represents no specific catgeory has been selected by user
    query += ` AND category='${category}'`;
  }
  if (month !== "all") {
    query += ` AND MONTH(date) = ${month}`;
  }
  if (year !== "all") {
    query += ` AND YEAR(date) = ${year}`;
  }

  try {
    const data = await db.sequelize.query(query, {
      type: db.sequelize.QueryTypes.SELECT,
    });
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(500).json({ message: "not able to fetch details" });
    }
  } catch (err) {
    console.error("error occured while fetching data in backend", err);
    res.status(505).json({ error: "inernal server error" });
  }
});

router.get("/details/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await db.sequelize.query(
      `SELECT id, name, category, date, amount FROM expenses WHERE id = ${id}`,
      { type: db.sequelize.QueryTypes.SELECT }
    );
    if (data) {
      res.status(200).json(data[0]);
    } else {
      res.status(500).json({ message: "Not able to fetch details" });
    }
  } catch (err) {
    console.error("Error occurred while fetching data in backend", err);
    res.status(505).json({ error: "Internal server error" });
  }
});

router.post("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { name, category, date, amount } = req.body;
  try {
    const update = await db.sequelize.query(
      `UPDATE expenses SET name='${name}', category='${category}', date='${date}', amount=${amount} WHERE id=${id}`
    );
    if (update) {
      res.status(200).json({ message: "Successfully updated expense" });
    } else {
      res.status(500).json({ message: "Failed to update the expense" });
    }
  } catch (err) {
    console.error("Error occurred while updating data in backend", err);
    res.status(505).json({ error: "Internal server error" });
  }
});


router.post("/delete/:id", async (req, res) => {
  const sid = req.params.id;
  try {
    const deletion = await db.sequelize.query(
      `DELETE FROM expenses WHERE id=${sid}`
    );
    res.status(200).json({ message: "Deleted successfully in the backend" });
  } catch (err) {
    res.status(505).json({ error: "internal server error" });
  }
});

export default router;
