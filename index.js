const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;


app.get("/", (req, res) => {
   res.send("Recycle Hut API is running");
});

app.listen(port, () => {
   console.log("Recycle Hut server is running on port", port);
});