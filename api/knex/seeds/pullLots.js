/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('lots').del()
  await knex('lots').insert([
    {id: 1, name: 'Мишка Гамми', price:7999,SellerID:1, BuyerID:2},
    {id: 2, name: 'Радиомагнитофон', price:2500,SellerID:1, BuyerID:null},
    {id: 3, name: 'Проводные наушники', price:15000,SellerID:1, BuyerID:null},
    {id: 4, name: 'BMW X5', price:5700000, SellerID:1, BuyerID:null},
  ]);
};
