/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {id: 1, nickname: 'NasDiK', password:'1234', dealsCompleted:'1',status:'Seller'},
    {id: 2, nickname: 'client', password:'1234', dealsCompleted:'1',status:'Client'},
    {id: 3, nickname: 'admin', password:'admin', dealsCompleted:'0',status:'Admin'},
    {id: 4, nickname: 'client2', password:'1234', dealsCompleted:'0',status:'Client'}
  ]);
};
