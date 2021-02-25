const { db, Cocktail, Tag, CocktailTag } = require('./server/db');

const seedCocktails = require('./seedCocktails');
const seedTags = require('./seedTags');
const seedCocktailTags = require('./seedCocktailTags');

const seed = async () => {
  try {
    await db.sync({ force: true });
    await Tag.bulkCreate(seedTags);
    await Cocktail.bulkCreate(seedCocktails);
    await CocktailTag.bulkCreate(seedCocktailTags);
    const testCocktail = await Cocktail.findOne({
      where: { name: seedCocktails[1].name },
      include: Tag,
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = seed;
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
  seed()
    .then(() => {
      console.log('Seeding success!');
      db.close();
    })
    .catch((err) => {
      console.error('Oh noes! Something went wrong!');
      console.error(err);
      db.close();
    });
}
