const express = require('express');

const db = require('./users-db');

const router = express.Router();

const bcrypt = require('bcryptjs');

router.get('/users', (req,res)=>{
    db.find()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(error=>{
            console.log(error);
            res.status(500).json({
                error:error,
                errorMessage: 'error getting users'
            });
        })
});

router.post('/register', (req,res)=>{
    req.body.password = bcrypt.hashSync(req.body.password,8);
    db.createUser(req.body)
        .then(data=>{
            res.status(201).json(data);
        })
        .catch(error=>{
            console.log(error);
            res.status(500).json({
                error:error,
                errorMessage: 'error creating user'
            });
        })
});

router.post('/login', (req,res)=>{
    db.findByName(req.body.username)
        .then(data=>{
            console.log(data);
            if(data && bcrypt.compareSync(req.body.password, data.password)){
                res.status(200).json({message:`Welcome ${data.username}`});
            }else{
                res.status(401).json({message:'Invalid Credentials'});
            }
        })
        .catch(error=>{
            console.log(error);
            res.status(500).json({
                error:error,
                errorMessage: 'error logging in  user'
            });
        })
});


module.exports = router;