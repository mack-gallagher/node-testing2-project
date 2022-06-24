const Dragon = require('./DC_dragons_model');

function validate_dragon(req, res, next) {
  if (!req.body.hasOwnProperty('is_special')
      || !req.body.hasOwnProperty('is_hybrid')
      || !req.body.hasOwnProperty('is_event')
      || !req.body.hasOwnProperty('is_holiday')
      || !req.body.hasOwnProperty('is_dimorphic')
      || !req.body.hasOwnProperty('morphology')
      || !req.body.hasOwnProperty('genus')
      || !req.body.hasOwnProperty('name')) {
      res.status(400).json({ message: 'invalid dragon' });
      return;
  } else if (parseInt(req.body.is_special) != req.body.is_special
            || parseInt(req.body.is_hybrid) != req.body.is_hybrid
            || parseInt(req.body.is_event) != req.body.is_event
            || parseInt(req.body.is_holiday) != req.body.is_holiday
            || parseInt(req.body.is_dimporphic) != req.body.is_dimorphic) {
  
      res.status(400).json({ message: 'invalid dragon' });
      return;
  } else {
    next();
  }
};

async function validate_dragon_id(req, res, next) {
  const dragon = await Dragon.get_by_id(req.params.id);
  if (!dragon) {
    res.status(404).json({ message: 'The specified dragon ID does not exist in the database' });
    return;
  } else {
    next();
  }
}

function validate_dragon_partial(req, res, next) {
  const pos_keys = [
                    'name',
                    'genus',
                    'morphology',
                    'primary_elememtal_affinity',
                    'secondary_elemental_affinity',
                    'is_dimorphic',
                    'is_holiday',
                    'is_event',
                    'is_hybrid',
                    'is_special',
                  ];

  const our_actual_keys = Object.keys(req.body);

  for (let i = 0; i < our_actual_keys.length; i++) {
    if (pos_keys.indexOf(our_actual_keys[i]) === -1) {
      res.status(400).json({ message: 'invalid dragon' });
      return;
    }
  }

  next();
}

module.exports = { validate_dragon, validate_dragon_id, validate_dragon_partial };
