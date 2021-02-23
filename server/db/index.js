const db = require('./db');
const Cocktail = require('./cocktails');
const Tag = require('./tags');
const CocktailTag = require('./cocktailTags');

Cocktail.belongsToMany(Tag, {
  through: 'cocktail_tags',
});
Tag.belongsToMany(Cocktail, {
  through: 'cocktail_tags',
});

module.exports = {
  db,
  Cocktail,
  Tag,
  CocktailTag,
};
