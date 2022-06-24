exports.up = function(knex) {
  return knex.schema
    .createTable('DC_dragons', tbl => {
      tbl
        .increments();
      tbl
        .varchar('name')
        .notNullable();
      tbl
        .varchar('genus')
        .notNullable();
      tbl
        .varchar('morphology')
        .notNullable();
      tbl
        .varchar('primary_elemental_affinity');
      tbl
        .varchar('secondary_elemental_affinity');
      tbl
        .integer('is_dimorphic')
        .notNullable();
      tbl
        .integer('is_holiday')
        .notNullable(); 
      tbl
        .integer('is_event')
        .notNullable();
      tbl
        .integer('is_hybrid')
        .notNullable();
      tbl
        .integer('is_special')
        .notNullable();
        
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('DC_dragons');
};
