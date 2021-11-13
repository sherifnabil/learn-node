const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
  .then(() => console.log('Connected to DB...'))
  .catch((err) => console.log('Error...', err));


const courseSchema = mongoose.Schema({
  tags: [String],
  date: {default: Date.now, type: Date},
  name: String,
  author: String,
  isPublished: Boolean,
  price: Number
});

const Course = mongoose.model('Course', courseSchema)

async function getCourses() {
  return await Course
  .find({
    isPublished : true,
    tags: {
      $in: ['backend', 'frontend']
    }
  })
  // .or([{ tags: 'backend' }, { tags: 'frontend' }]) //an alternative to the upper in block
  .sort('-price') // for ascending use property name for desc use -name / -property name
  .select('name author price') // select proerties with string syntax

}

async function run() {
  const courses = await  getCourses();
    console.log(courses);
}

run()