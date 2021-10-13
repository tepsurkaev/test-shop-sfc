const express = require("express");
const sequelize = require("./config");
const models = require("./models/models");
const cors = require("cors");
import path = require("path");
const indexRouter = require("./routes/index");

const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "static")));
app.use(express.static(path.resolve(__dirname, "client", 'build')));
app.use("/api", indexRouter);


app.get("*", (req: any, res: any) => {
  res.sendFile(path.resolve(__dirname, "..", "client", "build", "index.html"));
});

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (e: any) {
    console.log(e.toString());
  }
};

start();
