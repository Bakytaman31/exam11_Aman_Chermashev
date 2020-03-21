const path = require('path');

const express = require('express');
const multer = require('multer');
const nanoid = require('nanoid');

const config = require('../config');
const auth = require('../middleware/auth');

const Product = require('../models/Product');

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
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).send({message: 'Not found'});
        }

        res.send(product);
    } catch (error) {
        res.status(404).send({message: 'Not found'});
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
        Product.deleteOne({_id: req.body.id, owner: user._id});
        res.send("Deleted");
    } catch (error) {
        res.status(400).send(error);
    }
});



module.exports = router;