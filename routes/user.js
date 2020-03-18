const router = require("express").Router();
const Users = require("../models/User");


router.get("/view", (req, res) => {
    User.get(req.con, (err, rows) => {
        res.render('pages/user', {users : rows});
    });
});

router.post("/create", (req, res) => {
    const { fname, lname, age, email } = req.body;
    console.log("fname: " + fname);
    console.log("lname: " + lname);
    console.log("age: " + age);
    console.log("email: " + email);

    User.create(req.con, req.body, (err) => {
        res.redirect("/user/view");
    });
});

router.post("/delete", (req, res) => {
    const userID = req.query.userID;
    console.log("deleting user with ID " + userID);

    User.destroy(req.con, userID, (err) => {
        res.redirect("/user/view");
    });
});

router.get("/update", (req, res) => {
    const userID = req.query.userID;
    console.log("updating user with ID " + userID);

    User.getById(req.con, userID, (err, user) => {
        res.render("pages/updateUser", {
            user,
            userID: user[0].UserID,
            fname: user[0].FirstName,
            lname: user[0].LastName,
            age: user[0].Age,
            email: user[0].Email
        });
    });
});

router.post("/update", (req, res) => {
    const userID = req.query.userID;
    User.update(req.con, req.body, userID, (err) => {
        if(err) {
            throw(err);
        }
        res.redirect("/user/view");

        // res.render("/update/?userID="+userID);
    });
});


module.exports = router;    
