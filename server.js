const express = require("express");
const app = express();
const port = 3000;

// Sample records
const records = [
  { id: 1, name: "Record 1" },
  { id: 2, name: "Record 2" },
  { id: 3, name: "Record 3" },
];

const extraRecords = [
  { id: 4, name: "Extra Record 1" },
  { id: 5, name: "Extra Record 2" },
  { id: 6, name: "Extra Record 3" },
];

// Set up EJS as the view engine
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// Serve the home page
app.get("/", (req, res) => {
  res.render("index");
});

// API endpoint to return records
app.get("/api/records", (req, res) => {
  const getExtraRecords = req.get("x-get-extra-records") === "true";

  // Return additional records if the header is set to 'true'
  if (getExtraRecords) {
    return res.json([...records, ...extraRecords]);
  }

  // Return normal records if the header is not set to 'true'
  res.json(records);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
