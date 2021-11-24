const express = require("express");
const router = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Admin = require("../models/admin.model");
router.use(cors());

process.env.SECRET_KEY = "secret";

router.post("/register", (req, res) => {
    const today = new Date();
    const adminData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        created: today,
    };

    Admin.findOne({
        email: req.body.email,
    })
        .then((admin) => {
            if (!admin) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    adminData.password = hash;
                    Admin.create(adminData)
                        .then((admin) => {
                            res.json({ status: admin.email + "Registered!" });
                        })
                        .catch((err) => {
                            res.send("error: " + err);
                        });
                });
            } else {
                res.json({ error: "Admin already exists" });
            }
        })
        .catch((err) => {
            res.send("error: " + err);
        });
});

router.post("/login", (req, res) => {
    Admin.findOne({
        email: req.body.email,
    })
        .then((admin) => {
            if (admin) {
                if (bcrypt.compareSync(req.body.password, admin.password)) {
                    // Passwords match
                    const payload = {
                        _id: admin._id,
                        name: admin.name,
                        email: admin.email,
                    };
                    let token = jwt.sign(payload, process.env.SECRET_KEY, {
                        expiresIn: 1440,
                    });
                    //res.send(token);
                    res.json({ code: 1, _token: token });
                } else {
                    // Passwords don't match
                    res.json({ code: 0, error: "Admin does not exist" });
                }
            } else {
                res.json({ code: 0, error: "Admin does not exist" });
            }
        })
        .catch((err) => {
            res.send("error: " + err);
        });
});

router.get("/profile", (req, res) => {
    var decoded = jwt.verify(
        req.headers["authorization"],
        process.env.SECRET_KEY
    );

    Admin.findOne({
        _id: decoded._id,
    })
        .then((admin) => {
            if (admin) {
                res.json(admin);
            } else {
                res.send("Admin does not exist");
            }
        })
        .catch((err) => {
            res.send("error: " + err);
        });
});

module.exports = router;
