const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  // author: authorSchema // this approach or the one below
  author: {
    type: authorSchema,
    required: true
  }
}));

async function createCourse(name, author) {
  const course = new Course({
    name,
    author
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId) {
  const course = await Course.updateOne({ _id: courseId}, {
    $set: {
      'author.name': 'Sherif'
    },
    // $unset: { // to remove nested property
    //   'author.name': ''
    // }
  })
  console.log(course);
}

// createCourse('Node Course', new Author({ name: 'Sherif' }));
updateAuthor('6192a154445caaf8f2b566ca')