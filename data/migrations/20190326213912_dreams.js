exports.up = function(knex, Promise) {
  return knex.schema.createTable('dreams', table => {
    table.increments()
    table.string('title', 128).notNullable()
    table.string('description').notNullable()
    table.boolean('dreamCameTrue').notNullable()
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('dreams')
}
