const router = require("express").Router();
let Product = require("../models/product.model");

router.route("/").get((req, res) => {
    Product.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const detailes = req.body.detailes;
    const fulldescription = req.body.fulldescription;
    const image = req.body.image;
    const option = req.body.option;

    const newProduct = new Product({
        title,
        description,
        fulldescription,
        image,
        option,
        detailes,
    });

    newProduct
        .save()
        .then(() => res.json("Product added!"))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
    Product.findById(req.params.id)
        .then((product) => res.json(product))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
    Product.findByIdAndDelete(req.params.id)
        .then(() => res.json("Exercise deleted."))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
    Product.findById(req.params.id)
        .then((product) => {
            product.title = req.body.title;
            product.description = req.body.description;
            product.option = req.body.option;
            product.detailes = req.body.detailes;

            product
                .save()
                .then(() => res.json("Product updated!"))
                .catch((err) => res.status(400).json("Error: " + err));
        })
        .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
