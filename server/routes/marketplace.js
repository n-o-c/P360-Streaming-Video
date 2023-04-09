const express = require("express");
const router = express.Router();
const marketplaceController = require("../controllers/marketplaceController");

router.get("/nfts", marketplaceController.getAllNFTs);
router.get("/nft/:id", marketplaceController.getNFTById);
router.post("/purchase", marketplaceController.purchaseNFT);

module.exports = router;
