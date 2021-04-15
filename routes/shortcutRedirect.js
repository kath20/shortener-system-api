import { getMongoDbInstance } from "../utils/mongo.js";

const shortcutRedirect = async (req, res, next) => {
  const db = await getMongoDbInstance();
  let code = req.url;
  code = code.substring(1);

  const shortcodeExist = await db
    .collection("websites")
    .findOne({ shortcode: code });

  if (shortcodeExist) {
    let visits = await db.collection("websites").findOne({ shortcode: code });
    
    let newVisit = parseInt(visits.visits) + 1;
    const websiteCode = { shortcode: code };
    const updateVsits = { $set: { visits: newVisit } };
    let totalVisits = await db
      .collection("websites")
      .updateOne(websiteCode, updateVsits);
    const redirectUrl = shortcodeExist.url;
    res.redirect(redirectUrl);
  } else {
    next();
  }
};

export default shortcutRedirect;
