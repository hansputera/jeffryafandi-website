const { Router } = require("express");
const { resolve } = require("path");
const { hapusTugas, buatTugas } = require("../controllers/tugas-ctrl");
const router = Router();

router.get("/", (req, res) => {
    res.sendFile(resolve(_dirname, "..", "views", "manage.html"));
});

router.delete("/:id", hapusTugas);
router.post("/create", buatTugas);

module.exports = router;