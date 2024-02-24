const express = require("express");
const router = express.Router();
const wishController = require("../Controllers/wish-controllers");
const regionController = require("../Controllers/region-controllers");

router.post("/api/wish", wishController.createWish);
router.get("/api/wish", wishController.getAllWish);
router.put("/api/wish/:id", wishController.editWish);
router.get("/api/wish-count", wishController.getWishCount);
router.put("/api/wish/updateDate/:id", wishController.updateVisitDateWish);

router.post("/api/region", regionController.createRegion);
router.put("/api/region", regionController.addRegion);
router.get("/api/region", regionController.getAllRegion);

module.exports = router;
