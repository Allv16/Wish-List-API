const express = require("express");
const router = express.Router();
const wishController = require("../Controllers/wish-controllers");

router.post("/api/wish", wishController.createWish);
router.get("/api/wish", wishController.getAllWish);
router.put("/api/wish/:id", wishController.editWish);
router.put("/api/wish/completed/:id", wishController.setCompletedWish);

module.exports = router;
