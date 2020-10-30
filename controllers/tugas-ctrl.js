const Tugas = require("../models/tugas-model");

const buatTugas = async (req, res) => {
    const judul = req.body.judul;
    const context = req.body.content;

    if (!judul) {
        return res.status(500).json({
            success: false,
            message: "Missing Title"
        });
    } else if (!context) {
        return res.status(500).json({
            success: false,
            message: "Missing content"
        });
    } else {
        await Tugas.findOne({ judul: judul.toLowerCase() }, (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    err
                });
            }

            if (result) {
                return res.status(500).json({
                    success: false,
                    message: "That work has added!"
                });
            } else {
                const data = new Tugas({ judul, content });
                data
                .save()
                .then((res) => {
                    return res.status(200).json({
                        success: true,
                        result: res
                    });
                }).catch(e => {
                    return res.status(500).json({
                        success: false,
                        error: e
                    });
                });
            }
        });
    }
};

const hapusTugas = async (req, res) => {
    const _id = req.params.id;
    if (!_id) {
        return res.status(500).json({
            success: false,
            message: "Missing ID"
        });
    }

    await Tugas.findOne({ _id }, async (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                err
            });
        }

        if (!result) {
            return res.status(500).json({
                success: false,
                message: "That work doesn't exist!"
            });
        } else {
            await Tugas.deleteOne({ _id }, (err) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        err
                    });
                } else {
                    return res.status(200).json({
                        success: true,
                        result
                    });
                }
            });
        }
    });
};

const semuaTugas = async (req, res) => {
    await Tugas.find({}, (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                err
            });
        }

        return res.status(200).json(result);
    });
};

module.exports = {
    buatTugas,
    hapusTugas,
    semuaTugas
}