exports.up = function(knex, Promise) {
  return knex.schema.createTable('hopes', table => {
    table.increments()
    table.string('title', 128).notNullable()
    table.string('description').notNullable()
    table.boolean('hopesAchieved').notNullable()
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('hopes')
}
