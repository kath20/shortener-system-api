import { getMongoDbInstance } from "../utils/mongo.js";
import express from "express";
import urlExist from "url-exist";
import shortUrl from "node-url-shortener";
const router = express.Router();


/* POST shortcut creation. */
router.post("/", async (req, res, next) => {
  const db = await getMongoDbInstance();
  const link=req.body?.data?.url;
  const urlValid = await urlExist(link);
  if (urlValid) {
    const urlExistOnDb = await db
      .collection("websites")
      .findOne({ url: link });

    if (!urlExistOnDb) {
       shortUrl.short(link, async (err, url) => {
         const shortcode =url.substring(16);
        await db.collection("websites").insertOne({
          url: link,
          visits: 1,
          shortcode,
        });
        res.status(200).send(`Shortcode generado: ${shortcode}` );
      });
    } else {
      res.status(503).send("Url ya existe");
    }
  } else {
    res.status(503).send("Url no valido. Ej: https://google.com");
  }
});

export default router;
