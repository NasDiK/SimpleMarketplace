const express = require('express');
const router = express.Router();
const lotsController = require('../controllers/lotsController');

router.get('/getLots',(req,res)=>{
    lotsController.getLotsList().then(result=> {
        res.send(JSON.stringify({
            list: result
        }))
    });
});

router.get('/getMyLots/*',(req,res)=>{
    lotsController.getMyLots(req.path.split('/')[2]).then(result=> {
        res.send(JSON.stringify({
            list: result
        }))
    });
});

router.post('/addLot',(req,res)=>{
    lotsController.addLot(req.body).then(result=> {
        res.sendStatus(200)
    }).catch(err=>console.log(err));
});

router.delete('/deleteLot/*',(req,res)=>{
    lotsController.deleteLot(req.path.split('/')[2]).then(result=>res.sendStatus(200));
})

router.get('/getActiveLotsBySellerID/*',(req,res)=>{
   lotsController.getActiveLotsBySellerID(req.path.split('/')[2]).then(result=> {
       res.setHeader('Content-Type','application/json');
       res.send(result);
   });
});

router.get('/getMyOrders/*',(req,res)=>{
    lotsController.getMyOrders(req.path.split('/')[2]).then(result=>{
       res.setHeader('Content-Type','application/json');
       res.send({list:result});
    });
})

router.post('/buyLot',(req,res)=>{
    lotsController.buyLot(req.body).then(result=>res.sendStatus(200)).catch(err=> {
        console.log(err);
        res.sendStatus(500);
    });
})

module.exports=router;

