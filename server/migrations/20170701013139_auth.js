exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', table => {
      table.increments('uid').primary();
      table.string('username');
      table.string('email').unique();
      table.boolean('admin').notNullable().defaultTo(false);
      table.boolean('verified').notNullable().defaultTo(false);
      table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
      table.string('resetPasswordToken');
      table.date('resetPasswordExpires');
      table.string('password');
    }),
    knex.schema.createTable('claims', table => {
      table.integer('type_id').references('id').inTable('claim_types').notNullable();
      table.integer('user_id').references('uid').inTable('users').notNullable();
      table.integer('provider_id').notNullable();
      table.string('auth_token');
      table.string('refresh_token');
      table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
    }),
    knex.schema.createTable('claim_types', table => {
      table.increments('id').primary();
      table.string('name').notNullable();
    }),
  ]);
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('claims'),
    knex.schema.dropTable('claim_types'),
  ]);
};
