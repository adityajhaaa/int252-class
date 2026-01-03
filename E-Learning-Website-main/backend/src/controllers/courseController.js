import Course from '../models/Course.js';
import Order from '../models/Order.js';

// @desc    Fetch all courses
// @route   GET /api/courses
// @access  Public
const getCourses = async (req, res) => {
  const { search, level } = req.query;
  let query = {};

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }

  if (level) {
    query.level = level;
  }

  const courses = await Course.find(query);
  res.json(courses);
};

// @desc    Fetch single course
// @route   GET /api/courses/:id
// @access  Public
const getCourseById = async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (course) {
    res.json(course);
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
};

// @desc    Create a course
// @route   POST /api/courses
// @access  Private/Instructor
const createCourse = async (req, res) => {
  const {
    title,
    description,
    level,
    price,
    duration,
    image,
    modules,
  } = req.body;

  const course = new Course({
    user: req.user._id,
    title,
    description,
    instructor: req.user.name,
    level,
    price,
    duration: duration || '4 weeks',
    image: image || 'https://images.unsplash.com/photo-1516321318423-f06f70d504f0?w=400',
    modules: modules || [
      {
        title: 'Introduction',
        duration: '1h',
        lessons: [
          { title: 'Welcome to the course', duration: '10m', type: 'video' },
          { title: 'Course Overview', duration: '15m', type: 'video' }
        ]
      }
    ],
  });

  const createdCourse = await course.save();
  res.status(201).json(createdCourse);
};

// @desc    Get logged in user courses (Instructor)
// @route   GET /api/courses/mycourses
// @access  Private
const getMyCourses = async (req, res) => {
  const courses = await Course.find({ user: req.user._id });
  res.json(courses);
};

// @desc    Get enrolled courses
// @route   GET /api/courses/enrolled
// @access  Private
const getEnrolledCourses = async (req, res) => {
  const orders = await Order.find({ user: req.user._id, status: 'paid' });
  const courseIds = orders.map((order) => order.course);
  const courses = await Course.find({ _id: { $in: courseIds } });
  
  // Add completion percentage (placeholder for now, you can implement actual tracking later)
  const coursesWithProgress = courses.map(course => ({
    ...course.toObject(),
    completionPercentage: Math.floor(Math.random() * 30) + 10 // Random progress for demo
  }));
  
  res.json(coursesWithProgress);
};

// @desc    Delete a course
// @route   DELETE /api/courses/:id
// @access  Private/Instructor
const deleteCourse = async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (course) {
    if (course.user.toString() !== req.user._id.toString()) {
      res.status(401).json({ message: 'Not authorized to delete this course' });
      return;
    }
    await course.deleteOne();
    res.json({ message: 'Course removed' });
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
};

export { getCourses, getCourseById, createCourse, getMyCourses, getEnrolledCourses, deleteCourse };
