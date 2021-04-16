import { getMongoDbInstance } from "../utils/mongo.js";

const shortcutRedirect = async (req, res, next) => {
  const db = await getMongoDbInstance();
  let code = req.url;
  code = code.substring(1);

  const shortcodeExist = await db
    .collection("websites")
    .findOne({ shortcode: code });

  if (shortcodeExist) {
    const visits = await db.collection("websites").findOne({ shortcode: code });
    const newVisit = parseInt(visits.visits) + 1;
    const websiteCode = { shortcode: code };
    const updateVsits = { $set: { visits: newVisit } };
    await db.collection("websites").updateOne(websiteCode, updateVsits);
    const redirectUrl = shortcodeExist.url;
    res.redirect(redirectUrl);
  } else {
    next();
  }
};

export default shortcutRedirect;
