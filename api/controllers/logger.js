const knexfile = require('../knexfile');
const db = require('knex')(knexfile.development);

const logger = async (text)=>{
  await db('log').insert({id:db.defaultValue,text:text});
};

module.exports=logger;