const knexfile = require('../knexfile');
const db = require('knex')(knexfile.development);
const logger = require('./logger');

const getLotsList = async () => {
    let res;
    await db.select('lots.id', 'lots.name', 'lots.price', 'lots.creationDate', 'lots.SellerID', 'users.nickname').from('lots')
        .join('users', 'lots.SellerID', 'users.id')
        .where('lots.BuyerID', null)
        .then((result) => {
            res = result;
        });
    /*
    * SELECT lots.id,lots.name,lots.price,lots."creationDate",lots."SellerID" ,"users"."nickname"
    * FROM public.lots
    JOIN public.users ON "lots"."SellerID"="users".id
    WHERE "lots"."BuyerID" is null;*/
    return res;
}

const getMyLots = async function (userID) {
    let res;
    await db.select('*').from('lots').where({'SellerID': userID})
        .then(result => res = result);
    return res;
};

const addLot = async function(data){
     await db.insert({id:db.default, name:data.name,price:data.price,SellerID:data.SellerID}).into('lots');
    await logger(`[${new Date().toLocaleTimeString()}]:${data.SellerID} добавил лот: ${data.name} | ${data.price} P`);
}

const deleteLot = async function(lotId){
    await db('lots').where('id',lotId).del();
    await logger(`[${new Date().toLocaleTimeString()}]: удалён лот с ID: ${lotId}`);

}

const getActiveLotsBySellerID = async function(id){
    let res;
    await db('lots').select('*').where({'SellerID': id,'BuyerID':null}).then(x=>res=x);
    return JSON.stringify({
        list:res
    });
}

const getMyOrders = async (userId)=>{
    let res;
    await db('lots').select('lots.id','lots.name','lots.price','lots.creationDate','lots.SellerID','lots.BuyerID','users.nickname as SellerNickname')
        .join('users','lots.SellerID','users.id')
        .where({'BuyerID':userId})
        .then(result=> {
            res = result;
        });
    return res;
}

const buyLot = async (data)=>{ //{lotID:#,BuyerID:#,sellerID:#}
    await db('lots').where('id',data.lotID).update('BuyerID',data.BuyerID);
    let dealsCompletedSeller = await db('users').select('dealsCompleted').where('id',data.sellerID);
    let dealsCompletedBuyer = await db('users').select('dealsCompleted').where('id',data.BuyerID);
    await db('users').where('id',data.sellerID).update('dealsCompleted',dealsCompletedSeller[0].dealsCompleted+1);
    await db('users').where('id',data.BuyerID).update('dealsCompleted',dealsCompletedBuyer[0].dealsCompleted+1);
    await logger(`[${new Date().toLocaleTimeString()}]: ${data.BuyerID} купил лот с ID ${data.lotID} у ${data.sellerID}`);
}

module.exports = {
    getLotsList,
    getMyLots,
    addLot,
    deleteLot,
    getActiveLotsBySellerID,
    getMyOrders,
    buyLot
}