const router = require('express').Router();
const { Cocktail, Tag, db } = require('../db');
const Sequelize = require('sequelize');
const { QueryTypes } = require('sequelize');

router.get('/', async (req, res, next) => {
  try {
    const { likes, dislikes } = req.body;
    const likesWhere = likes
      ? `cocktails.id in (
	    select cocktail_tags."cocktailId" from cocktail_tags
	    where cocktail_tags."tagId" in (${likes}))`
      : '';
    const dislikesWhere = dislikes
      ? `cocktails.id not in (
	    select cocktail_tags."cocktailId" from cocktail_tags
	    where cocktail_tags."tagId" in (${dislikes}))`
      : '';
    const where =
      likes || dislikes
        ? ` where ${likesWhere}
      ${likes && dislikes ? ' and ' : ''}
      ${dislikesWhere}`
        : '';
    const query = `select cocktails.id, cocktails.name from cocktails${where}`;
    const cocktails = await db.query(query, {
      plain: false,
      raw: false,
      type: QueryTypes.SELECT,
    });
    console.log(cocktails.map((cocktail) => cocktail.id));
    res.json(cocktails);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
