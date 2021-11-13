const express = require('express')
const router = express.Router();
const Joi = require('joi');

const courses = [
  {id:1, name:'Course 1'},
  {id:2, name:'Course 2'},
  {id:3, name:'Course 3'},
];

router.get('/', (req, res) => {
  res.send(courses);
});

// read
router.get('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) res.status(404).send(`The Course Doesn't Exist`)
    res.send(course);
});

//create
router.post('', (req, res) =>  {
  const {error} = validation(req.body)
  if(error) return res.status(400).send(error.message);

  const course = {
    id: courses.length +1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});

// update
router.put('/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id))
  if(!course) return res.status(404).send(`The Course Doesn't Exist`)

  const {error} = validation(req.body)
  if(error) return res.status(400).send(error.message);

  course.name = req.body.name;
  res.send(course);
});

// delete
router.delete('/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id))
  if(!course) return res.status(404).send(`The Course Doesn't Exist`)
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});

// validation
function validation(name) {
  const schema = Joi.object({
    name: Joi.string().min(3).required()
  });
  return schema.validate(name)
}

module.exports = router