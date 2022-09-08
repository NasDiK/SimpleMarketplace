const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

router.post('/login',(req,res)=>{
    loginController.getLoginStatus(req.body).then((result)=> {
        if(result.length!==0) {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({list: result[0]}));
        }
        else res.sendStatus(400);
    });

});

router.get('/getUserInfoByNickname/*',(req,res)=>{
   loginController.getUserInfoByNickname(req.path.split('/')[2]).then(result=>{
       res.setHeader('Content-Type', 'application/json');
       res.send(result);
   })
});

router.post('/registerUser',(req,res)=>{
    loginController.registerUser(req.body).then(result=>{
        res.sendStatus(200);
    }).catch(err=> {
        console.log(err);
        res.sendStatus(501);
    })
});

router.delete('/deleteUser',(req,res)=>{
    loginController.deleteUser(req.body).then(result=>{
        res.sendStatus(200);
    }).catch(err=>{
        console.log(err);
        res.sendStatus(501);
    })
})

router.get('/getAllUsers',(req,res)=>{
    loginController.getAllUsers()
        .then(result=>{
        res.setHeader('Content-Type','application/json');
        res.send(JSON.stringify({list:result}));
    })
        .catch(err=> {
            console.log(err);
            res.sendStatus(500);
        })
})

module.exports = router;