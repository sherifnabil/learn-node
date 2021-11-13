const express = require('express');
const router = express.Router();


const genres = [
  {id:1, name: 'Romance'},
  {id:2, name: 'Horror'},
  {id:3, name: 'Action'},
];

router.get('/', (req, res) => {
  res.send(genres);
});

router.post('/', (req, res) => {
  const {error} = validation(req.body)
  if(error) return res.status(400).send(error.message);

  const genre = {
    id: genres.length +1,
    name: req.body.name
  };
  genres.push(genre);

  res.send(genre);
});

// validation
function validation(name) {
  const schema = Joi.object({
    name: Joi.string().min(3).required()
  });
  return schema.validate(name)
}

module.exports = router;