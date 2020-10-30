const { Schema, model } = require("mongoose");

const Tugas = new Schema(
    {
        "_id": String,
        "judul": String,
        "content": String
    }, {
        timestamps: true
    }
);

module.exports = model("tugas", Tugas);