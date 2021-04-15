import { getMongoDbInstance } from "../utils/mongo.js";

const shortcutRedirect = async (req, res, next) => {
  const db = await getMongoDbInstance();
  let code = req.url;
  code = code.substring(1);
  const shortcodeExist = await db
    .collection("websites")
    .findOne({ shortcode: code });
  if (shortcodeExist) {
    res.send(shortcodeExist.url);
  } else {
    next();
  }

  // res.send('Falta verificar shortcut');
};

export default shortcutRedirect;
