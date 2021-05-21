const mongoose = require('mongoose');
const config = require('./config');
const User = require("./models/User");
const Cocktail = require("./models/Cocktail");
const {nanoid} = require('nanoid');

const run = async () => {
  await mongoose.connect(config.db.url, config.db.options);

  const collections = await mongoose.connection.db.listCollections().toArray();

  for (const coll of collections) { // [{name: 'users'}, {name: 'products'}]
    await mongoose.connection.db.dropCollection(coll.name);
  }

  const [user, admin] = await User.create({
    email: 'user@cocktail',
    password: '1qaz@WSX29',
    token: nanoid(),
    role: 'user',
    displayName: 'User'
  }, {
    email: 'admin@cocktail',
    password: '1qaz@WSX29',
    token: nanoid(),
    role: 'admin',
    displayName: 'Admin'
  });

  await Cocktail.create({
    user: user,
    title: 'Test1',
    recipe: 'Something',
    published: false
  }, {
    user: admin,
    title: 'Test2',
    recipe: 'Something...',
    published: true
  });

  await mongoose.connection.close();
};

run().catch(console.error);