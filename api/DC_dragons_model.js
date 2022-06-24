const db = require('../data/db-config');

function get_all() {
  return db('DC_dragons');
};

function get_by_id(dragon_id) {
  return db('DC_dragons')
          .where({ id: Number(dragon_id) })
          .first();
};

function add(dragon) {
  return db('DC_dragons')
          .insert(dragon)
          .then(ids => {
            return db('DC_dragons');
          })
};

function update(dragon_id, dragon) {
  return db('DC_dragons')
    .where({ id: Number(dragon_id) })
    .first()
    .then(old_dragon => {
      const new_dragon = Object.create(old_dragon);
      const updates = Object.entries(dragon);
      for (let i = 0; i < updates.length; i++) {
        new_dragon[updates[i][0]] = updates[i][1];
      }
      return db('DC_dragons')
        .where({ id: Number(dragon_id) })
        .update(new_dragon)
        .then(feedback => {
          return db('DC_dragons')
            .where({ id: Number(dragon_id) })
            .first();
        })
    });
}

module.exports = { get_all, get_by_id, add, update };
