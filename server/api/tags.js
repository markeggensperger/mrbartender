const router = require('express').Router();
const { Cocktail, Tag } = require('../db');
const Sequelize = require('sequelize');

router.get('/', async (req, res, next) => {
  try {
    const { likes, dislikes } = req.body;

    const tags = await Tag.findAll({
      include: {
        model: Cocktail,
        attributes: ['name'],
      },
    });
    res.json(tags);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
