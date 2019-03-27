exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('hopes')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('hopes').insert([
        {
          id: 1,
          title: 'stuff but hopes',
          description: 'la hopes la la la la',
          hopesAchieved: true
        },
        {
          id: 2,
          title: 'more stuff ha la le',
          description: 'la la la la SQL is great',
          hopesAchieved: false
        },
        {
          id: 3,
          title: 'e',
          description: 'a',
          hopesAchieved: false
        }
      ])
    })
}
