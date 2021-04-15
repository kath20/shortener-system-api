import { getMongoDbInstance } from "../utils/mongo.js";
import express from "express";
import urlExist from "url-exist";
import shortUrl from "node-url-shortener";
const router = express.Router();


/* POST shortcut creation. */
router.post("/", async (req, res, next) => {
  const db = await getMongoDbInstance();
  const urlValid = await urlExist(req.body.url);
  if (urlValid) {
    const urlExistOnDb = await db
      .collection("websites")
      .findOne({ url: req.body.url });

    if (!urlExistOnDb) {
      shortUrl.short(urlValid, async (err, url) => {
        console.log("codigo: " + url);
        await db.collection("websites").insertOne({
          url: req.body.url,
          visits: 1,
          shortcode: url.substr(16),
        });
        res.status(200).send("Guardamos tus datos");
      });
    } else {
      res.status(503).send("Url ya existe");
    }
  } else {
    res.status(503).send("Url no valido. Ej: https://google.com");
  }
});

export default router;
