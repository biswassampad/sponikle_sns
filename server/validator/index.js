exports.userSignupValidator = (req, res, next) => {
    // name is not null and between 4-50 chars
    req.check("name", "Name is required").notEmpty();

    // check for password 
    req.check("password", "Password is required").notEmpty();
    req.check('password')
        .isLength({ min: 6 })
        .withMessage("Password must conatin atleast 6 characters")
        .matches(/\d/)
        .withMessage("Password must contain a number");
    // check for errors 

    const error = req.validationErrors();
    if (error) {
        const firstError = error.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    // push it to next

    next();
}