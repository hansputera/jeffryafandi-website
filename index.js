const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const bodyParser = require("body-parser");
const db = require("./db");
const db_ = require("./models/tugas-model");
const { semuaTugas } = require("./controllers/tugas-ctrl");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (_, res) => {
    res.sendFile(__dirname + "/views/index.html");
    io.on("connection", (client) => {
        db.on("error", () => {
            console.error(`MongoDB Connection ERROR`);
            client.emit("web-connect", "Error when connect to MongoDB!");
        });
        db.on("connected", () => {
            console.log("MongoDB Successfuly connected!");
            db_.find({}, (err, res) => {
                client.emit("web-connect", res);
            });
        });
    });
});
app.get("/data_information_db", semuaTugas);
app.use("/manage", require("./routes/manage"));

server.listen(process.env.PORT ? process.env.PORT : 8080, () => console.log(`Listen to ${process.env.PORT ? process.env.PORT : 8080}`));