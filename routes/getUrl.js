import { getMongoDbInstance } from "../utils/mongo.js";
import express from "express";
const router = express.Router();

/* POST get url from shortcut. */
router.post('/', async(req, res, next)=> {
  const db = await getMongoDbInstance();
  const shortcodeExist = await db
  .collection("websites")
  .findOne({shortcode:req.body?.shortcode });
if(shortcodeExist){
  res.send(shortcodeExist.url);
}else{
  res.send('This shortcut does not exist');
}
});




export default router;
