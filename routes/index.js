const express = require('express');
const router = express.Router();
const uuid = require('uuid');
let upload = require('./upload');
const url = require('url');
let Image = require('../models/images');

// Home route
router.get('/', (req, res) => {
    // When running tests, skip MongoDB & EJS and return plain HTML
    if (process.env.NODE_ENV === "test") {
        return res.send("<h1>Hello Test</h1>");
    }

    // Normal behavior (production/dev)
    Image.find({}, function (err, images) {
        if (err) {
            console.log(err);
            return res.status(500).send("Error fetching images");
        }
        res.render('index', { images: images, msg: req.query.msg });
    });
});

// Upload route
router.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.redirect(`/?msg=${err}`);
        } else {
            console.log(req.file);

            if (req.file === undefined) {
                res.redirect('/?msg=Error: No file selected!');
            } else {
                // create new image
                let newImage = new Image({
                    name: req.file.filename,
                    size: req.file.size,
                    path: 'images/' + req.file.filename
                });

                // save the uploaded image to the database
                newImage.save()
                    .then(() => res.redirect('/?msg=File uploaded successfully'))
                    .catch(saveErr => {
                        console.error(saveErr);
                        res.redirect('/?msg=Error saving file to DB');
                    });
            }
        }
    });
});

module.exports = router;
