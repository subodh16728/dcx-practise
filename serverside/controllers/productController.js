const Products = require("../models/productModel");

// Get all products
exports.getProduct = (req, res) => {
    Products.find()
        .then((response) => {
            res.status(200).json(response);
        })
        .catch((error) => {
            res.status(400).send(error)
        })
}

// Add a product
exports.addProduct = (req, res) => {
    const NewProduct = req.body;
    if (NewProduct != null) {
        Products.create(NewProduct)
            .then((response) => {
                res.status(201).send(response)
            })
            .catch((error) => {
                console.log(error);
                res.status(400).send(error)
            })

    } else {
        res.status(400).send(`Empty data cannot be added`)
    }
}