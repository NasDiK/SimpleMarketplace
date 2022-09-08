/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('users',(table)=>{
      table.increments('id');
      table.text('nickname').notNullable().unique();
      table.text('password').notNullable();
      table.double('dealsCompleted').defaultTo(0).notNullable();
      table.text('status').notNullable();
      table.timestamp('registerDate').defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
