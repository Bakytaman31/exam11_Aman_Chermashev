const path = require('path');

const express = require('express');
const multer = require('multer');
const nanoid = require('nanoid');

const config = require('../config');
const auth = require('../middleware/auth');

const Product = require('../models/Product');
const Category = require('../models/Category');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

const router = express.Router();

router.get('/', async (req, res) => {
    const products = await Product.find().populate('category');
    res.send(products);
});

router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findOne({_id: req.params.id}).populate('category owner');

        if (!product) {
            return res.status(404).send({message: 'Not found'});
        }

        res.send(product);
    } catch (error) {
        res.status(404).send({message: 'Not found'});
    }
});

router.get('/categories/:id', async (req, res) => {
        try {
            const products = await Product.find({category: req.params.id}).populate('category owner');
            res.send(products);
        } catch (error) {
            res.status(400).send(error);
        }
});

router.post('/', [auth, upload.single('image')], async (req, res) => {
    try{
        const productData = req.body;
        const user = req.user;

        productData.owner = user._id;

        if (req.file) {
            productData.image = req.file.filename;
        }

        const product = new Product(productData);


        await product.save();

        return res.send("Saved");
    } catch (error) {
        return res.status(400).send(error);
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        const user = req.user;
        console.log(user, req.params.id);
        await Product.deleteOne({_id: req.params.id, owner: user._id});
        res.send("Deleted");
    } catch (error) {
        res.status(400).send(error);
    }
});



module.exports = router;