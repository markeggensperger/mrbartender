const router = require('express').Router();
const { Cocktail, Tag, db } = require('../db');
const Sequelize = require('sequelize');
const { QueryTypes } = require('sequelize');

router.get('/', async (req, res, next) => {
  try {
    const cocktailIds =
      req.body.cocktailIds ||
      (await Cocktail.findAll()).map((cocktail) => cocktail.id);
    const count = cocktailIds.length;
    const queriedIds = req.body.queriedIds || [0];
    const query = `select tags.tag, abs(${count}-count(*)) as score
        from tags
        join cocktail_tags on cocktail_tags."tagId" = tags.id
        where cocktail_tags."cocktailId" in (${cocktailIds})
        and tags.id not in (${queriedIds})
        group by tags.tag
        order by score`;
    //console.log('query: ', query);
    const tags = await db.query(
      `select tags.tag, abs(${count}-count(*)) as score
        from tags
        join cocktail_tags on cocktail_tags."tagId" = tags.id
        where cocktail_tags."cocktailId" in (${cocktailIds})
        and tags.id not in (${queriedIds})
        group by tags.tag
        order by score`,
      {
        plain: false,
        raw: false,
        type: QueryTypes.SELECT,
      }
    );

    res.json(tags);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
