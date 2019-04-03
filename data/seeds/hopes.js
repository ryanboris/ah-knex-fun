exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('hopes')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('hopes').insert([
        { id: 1, title: 'stuff', description: 'la la la' },
        {
          id: 2,
          title: 'i hope!',
          description: 'la la la la'
        },
        {
          id: 3,
          title: 'Hopes yayayaya',
          description: 'la la la ha'
        }
      ])
    })
}
