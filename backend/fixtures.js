const mongoose = require('mongoose');
const config = require('./config');
const Category = require('./models/Category');
const Product = require('./models/Product');
const User = require('./models/User');

const run = async () => {
    await mongoose.connect(config.database, config.databaseOptions);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (let coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [laptops, bikes, phones] = await Category.create({
        title: 'Laptops'
    }, {
        title: 'Bikes'
    }, {
        title: 'Phones'
    });

    const [user1, user2, user3] = await User.create({
        username: 'john_doe',
        password: 'johnDoe',
        phoneNumber: '+996 707 103 017',
        name: 'John Doe',
        token: '5g3gvb3bg'
    }, {
        username: 'blackHunter',
        password: 'blackHunter',
        phoneNumber: '+996 700 100 217',
        name: 'Black Hunter',
        token: 'yt7vvvvvv'
    }, {
        username: 'someuser',
        password: 'someuser',
        phoneNumber: '+996 500 104 267',
        name: 'Some User',
        token:'vmfklmlkvmkrev333'
    });

    await Product.create({
        title: 'Trance E+ Prop',
        price: 500,
        category: bikes,
        image: 'fixtures/bike.jpg',
        owner: user1,
        description: 'Product1'
    }, {
        title: 'MacBook',
        price: 700,
        category: laptops,
        image: 'fixtures/laptop.jpg',
        owner: user2,
        description: 'Product2'
    }, {
        title: 'Xiaomi Mi 6X',
        price: 300,
        category: phones,
        image: 'fixtures/phone.jpg',
        owner: user3,
        description: 'Product3'
    });

    mongoose.connection.close();
};

run().catch(e => {
    mongoose.connection.close();
    throw e;
});