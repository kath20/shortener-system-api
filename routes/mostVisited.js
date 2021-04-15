import { getMongoDbInstance } from "../utils/mongo.js";
import express from "express";
const router = express.Router();

/* POST most visited websites. */
router.post("/", async (req, res, next) => {
  const db = await getMongoDbInstance();
  await db
    .collection("websites")
    .find({})
    .limit(20)
    .sort({ visits: -1 })
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});

export default router;
