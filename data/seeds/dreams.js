exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('dreams')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('dreams').insert([
        { id: 1, title: 'stuff', description: 'la la la' },
        {
          id: 2,
          title: 'more stuff',
          description: 'la la la la'
        },
        {
          id: 3,
          title: 'stuff again',
          description: 'la la la ha'
        }
      ])
    })
}
