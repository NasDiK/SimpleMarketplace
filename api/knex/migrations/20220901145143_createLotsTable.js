/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('lots',(table)=>{
     table.increments();
     table.text('name');
     table.double('price');
     table.timestamp('creationDate').defaultTo(knex.fn.now());
     table.integer('SellerID').references('id').inTable('users').notNullable().onDelete('CASCADE');
     table.integer('BuyerID').references('id').inTable('users').onDelete('SET NULL');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('lots');
};
