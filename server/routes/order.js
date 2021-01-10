var express = require("express");
var router = express.Router();
var sql = require("mssql");
const sqlConfig = require("../config");

// Get all orders.
router.get("/", (req, res) => {
  sql.connect(sqlConfig, () => {
    var request = new sql.Request();
    request.query("SELECT * FROM dbo.[ORDER]", (err, recordsets) => {
      if (err) {
        console.log(err);
        if (err.code === "ENOCONN")
          return res.status(503).send({ error: { err } });
        return res.status(400).send({ error: { err } });
      }
      res.setHeader("Content-Type", "application/json");
      sql.close();
      return res.status(200).send({ orders: recordsets.recordset }); // Result in JSON format
    });
  });
});

// Delete the order.
router.delete("/delete/:orderID", (req, res) => {
  var orderID = req.body.orderID;
  sql.connect(sqlConfig, () => {
    var request = new sql.Request();
    request.input("orderID", sql.Int, orderID || "NULL");
    request.execute("sp_deleteWrongOrder", (err, result) => {
      if (err) {
        console.log(err);
        if (err.code === "ENOCONN")
          return res.status(503).send({ error: { err } });
        return res.status(400).send({ error: { err } });
      }

      res.setHeader("Content-Type", "application/json");
      sql.close();

      return res.status(200).send({ deletedOrder: { ...req.body } });
    });
  });
});

// Insert a new order.
router.post("/insert", (req, res) => {
  var employeeID = req.body.employeeID;
  var partID_1 = req.body.partID_1;
  var partID_1_quantity = req.body.partID_1_quantity;
  var partID_2 = req.body.partID_2;
  var partID_2_quantity = req.body.partID_2_quantity;
  var partID_3 = req.body.partID_3;
  var partID_3_quantity = req.body.partID_3_quantity;
  var partID_4 = req.body.partID_4;
  var partID_4_quantity = req.body.partID_4_quantity;
  var partID_5 = req.body.partID_5;
  var partID_5_quantity = req.body.partID_5_quantity;
  var partID_6 = req.body.partID_6;
  var partID_6_quantity = req.body.partID_6_quantity;
  var partID_7 = req.body.partID_7;
  var partID_7_quantity = req.body.partID_7_quantity;
  var partID_8 = req.body.partID_8;
  var partID_8_quantity = req.body.partID_8_quantity;
  var partID_9 = req.body.partID_9;
  var partID_9_quantity = req.body.partID_9_quantity;
  var partID_10 = req.body.partID_10;
  var partID_10_quantity = req.body.partID_10_quantity;

  sql.connect(sqlConfig, () => {
    var request = new sql.Request();
    request.input("employeeID", sql.TinyInt, employeeID || "NULL");
    request.input("partID_1", sql.BigInt, partID_1 || "NULL");
    request.input(
      "partID_1_quantity",
      sql.SmallInt,
      partID_1_quantity || "NULL"
    );
    request.input("partID_2", sql.BigInt, partID_2 || "NULL");
    request.input(
      "partID_2_quantity",
      sql.SmallInt,
      partID_2_quantity || "NULL"
    );
    request.input("partID_3", sql.BigInt, partID_3 || "NULL");
    request.input(
      "partID_3_quantity",
      sql.SmallInt,
      partID_3_quantity || "NULL"
    );
    request.input("partID_4", sql.BigInt, partID_4 || "NULL");
    request.input(
      "partID_4_quantity",
      sql.SmallInt,
      partID_4_quantity || "NULL"
    );
    request.input("partID_5", sql.BigInt, partID_5 || "NULL");
    request.input(
      "partID_5_quantity",
      sql.SmallInt,
      partID_5_quantity || "NULL"
    );
    request.input("partID_6", sql.BigInt, partID_6 || "NULL");
    request.input(
      "partID_6_quantity",
      sql.SmallInt,
      partID_6_quantity || "NULL"
    );
    request.input("partID_7", sql.BigInt, partID_7 || "NULL");
    request.input(
      "partID_7_quantity",
      sql.SmallInt,
      partID_7_quantity || "NULL"
    );
    request.input("partID_8", sql.BigInt, partID_8 || "NULL");
    request.input(
      "partID_8_quantity",
      sql.SmallInt,
      partID_8_quantity || "NULL"
    );
    request.input("partID_9", sql.BigInt, partID_9 || "NULL");
    request.input(
      "partID_9_quantity",
      sql.SmallInt,
      partID_9_quantity || "NULL"
    );
    request.input("partID_10", sql.BigInt, partID_10 || "NULL");
    request.input(
      "partID_10_quantity",
      sql.SmallInt,
      partID_10_quantity || "NULL"
    );
    request.execute("sp_insertNewEmployee", (err, result) => {
      if (err) {
        console.log(err);
        if (err.code === "ENOCONN")
          return res.status(503).send({ error: { err } });
        return res.status(400).send({ error: { err } });
      }

      res.setHeader("Content-Type", "application/json");
      sql.close();

      return res.status(200).send({ newOrder: { ...req.body } });
    });
  });
});

module.exports = router;