const DC_dragons = [
                      { name: 'Terrae', genus: 'Dragon', morphology: 'semidrak', 
                        primary_elemental_affinity: 'Earth', 
                        is_dimorphic: 1, is_holiday: 0, is_event: 0, is_hybrid: 0, is_special: 0 },
                      { name: 'Elux Lucis', genus: 'Dragon', morphology: 'polylindwyrm', 
                        primary_elemental_affinity: 'Light', secondary_elemental_affinity: 'Air',
                        is_dimorphic: 0, is_holiday: 0, is_event: 0, is_hybrid: 0, is_special: 0 },
                      { name: 'Aeon Wyvern', genus: 'Dragon', morphology: 'wyvern',
                        primary_elemental_affinity: 'Time',
                        is_dimorphic: 1, is_holiday: 0, is_event: 0, is_hybrid: 0, is_special: 0 },
                      { name: 'Avatar Of Creation', genus: 'Dragon', morphology: 'western',
                        primary_elemental_affinity: 'Light',
                        is_dimorphic: 0, is_holiday: 0, is_event: 0, is_hybrid: 1, is_special: 1 },
                    ];

exports.DC_dragons = DC_dragons;

exports.seed = function(knex) {
  return knex('DC_dragons').insert(DC_dragons);
}
