import { getMongoDbInstance } from "../utils/mongo.js";
import express from "express";
const router = express.Router();

/* POST get url from shortcut. */
router.post("/", async (req, res, next) => {
  const db = await getMongoDbInstance();
  const user = await db.collection("users").findOne({ user: req.body?.data?.user });
  const password = await db
    .collection("users")
    .findOne({ password: req.body?.data?.password });
      if (user && password) {
        res.send(true);
      } else {
        res.send(false);
      }
});

export default router;
