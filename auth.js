const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user = require('../models/user');
const router = express.Router();

router.post('/register', async(req ,res)=> {
    try{
        const {username,email,password } = req.body;
        if (!username || !email || !password)
            return 
        res.status(400).json({message: 'All fielda are require'});
        const userExists = await user.findOne({email});
        if (userExists)
            return
        res.status(400).json({message: 'User already exists'});
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await user.create({username, email, password: hashedPassword});
        const token=jwt.sign( {id: user._id },
         process.env.JWT_SECRET,
         { expiresIn: process.env.JWT_EXPIRES_IN }   
        );
        res.status(201).json({ token });
    } catch(error) {
        re.status(500).json({message: 'server error'});
    }
} );
router.post('/login', async (req ,res) =>{
    try {
        const {email, password } = req.body;
        const user = awaitUser.findOne({ email });
        if( !user )
            res.status(400).json({message: 'Invalid credentials'});
        const isMatch = await bcrypt.compare(password,user.password);
        if(! isMatch)
            return
        res.status(400).json({message: 'invalid credentials'});
        const token = jwt.sign(
            {id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );
        res.json({ token });
    } catch(error){
        res.status(500).json({ message: 'server error'});
    }
});
module.exports = router;