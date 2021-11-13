const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')  // returns a promise
  .then(()  =>  console.log('Connected to Mongo DB...'))
  .catch((error)  =>  console.log('Could not connect to mongoDB.. ', error));

const coursesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    // match: /pattern/
  },
  category: {
    type: String,
    required: true,
    enum: ['web', 'mobile', 'network'],
    lowercase: true,
    // uppercase: true,
    trim: true,
  },
  author: String,
  tags: {
    type: Array,
    validate: { // custom validator
      validator: function(v) {
        return v && v.length > 0
       },
      message: 'A Course should have at least one tag.'
    }
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    min: 5,
    max:500,
    get: v => Math.round(v),
    set: v => Math.round(v),
    required: function() { return this.isPublished }
  }
});

const Course = mongoose.model('Course', coursesSchema);

async function createCourse() {
  const course = new Course({
      name: 'Node Course',
      author: 'Sherif',
      tags: ['frontend', 'reactjs'],
      isPublished: true,
      price: 15.7,
      category: 'Web'
  });

  try{
    const result = await course.save();
    console.log(result)
  }
  catch (ex) {
    for(e in ex.errors)
      console.log('Error ', ex.errors[e].message);
  }
}

async function getCourses() {

  // Comparison operator
  // eq ( equal )
  // ne ( not equal )
  // gt ( greater than )
  // gte ( greater than or equal to )
  // lt ( less than )
  // lte ( less than or equal to )
  // in
  // in ( not in )

  // Logical operator
  // or
  // and

  const courses =  await Course

    // .find({author: 'Sherif'})
    // .find({price: { $gte: 10, $lte: 20}}) // greater than or equal to 10  and less than or equal to 20
    // .find({price: { $in: [10, 15, 20 ]}}) // where prices are 10, 15, 20

    .find()
    .or([ { author: 'Sherif' }, { isPublished: true } ]) // get documents where author is Sherif or documents which are isPublished is true
    .and([ { author: 'Sherif' }, { isPublished: true } ]) // get documents where author is Sherif and documents which are isPublished is true

    // regular expression find documents where author starts with Sherif or sherif used array for multi options
    .find({ author : /^sherif/i  }) // i for case senstive

    // regular expression find documents where name ends with t Course
    .find({ name : /t Course$/  })

    // regular expression find documents where author contains eri
    .find({ author : /.*erif.*/  })

    .limit(10)

    // for pagination we use skip and limit methods
    // as pageNumber and page size
    //  pageNumber = 2 and pageSize = 10
    //  .skip( (pageNumber -1) * pageSize)
    //  .limit(pageSize)

    .sort({ name: -1, date: -1 })
    .select({name:1 , tags: 1, author: 1})

    // counts documents which matches this criteria
    // .count();
  console.log(courses);
}

// getCourses();

async function updateCourse(id) {
  // Approach: Query first
    // findById()
    // modify its properties
    // save()
  // const course = await Course.findById(id)
  // if (!course) return;

  // // advantage of querying first to validate some actions first
  // if (course.isPublished) return;

  // course.isPublished = true;
  // course.author = 'Another Author';
  // or optionally can use
  // course.set({
  //   isPublished : true,
  //   author : 'Another Author'
  // })

  // const result = await course.save();

  // Approach: Update first
    // update directly
    // Optionally: get the updated document

    const course = await Course.findByIdAndUpdate(id, { // filter object and updaet object
      // const result = await Course.updateOne({ _id: id }, { // filter object and updaet object
      $set: { // mongo update operator
        isPublished: true,
        author: 'Sherif'
      }
    }, { new: true});

  console.log(course);

}

async function removeCourse(id) {
  const result = await Course.deleteOne({ _id: id });

  console.log(result);

}
createCourse();