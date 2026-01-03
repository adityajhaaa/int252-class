/**
 * Mock data for frontend development
 * This will be replaced with real API calls from services/
 */

export const MOCK_COURSES = [
  {
    id: 1,
    title: 'React Fundamentals',
    description: 'Learn React basics including components, hooks, and state management.',
    instructor: 'Sarah Johnson',
    level: 'Beginner',
    price: 2999,
    duration: '4 weeks',
    students: 1240,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=400',
    modules: 12,
    completionPercentage: 0,
  },
  {
    id: 2,
    title: 'Advanced JavaScript ES6+',
    description: 'Master modern JavaScript features, async/await, and design patterns.',
    instructor: 'Michael Chen',
    level: 'Intermediate',
    price: 3499,
    duration: '6 weeks',
    students: 892,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400',
    modules: 15,
    completionPercentage: 0,
  },
  {
    id: 3,
    title: 'Full Stack MERN Development',
    description: 'Build complete applications with MongoDB, Express, React, and Node.js.',
    instructor: 'Alex Rodriguez',
    level: 'Advanced',
    price: 5999,
    duration: '12 weeks',
    students: 456,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1516321318423-f06f70d504f0?w=400',
    modules: 24,
    completionPercentage: 0,
  },
  {
    id: 4,
    title: 'Tailwind CSS Mastery',
    description: 'Create beautiful, responsive designs with Tailwind CSS utility framework.',
    instructor: 'Emma Davis',
    level: 'Beginner',
    price: 1999,
    duration: '3 weeks',
    students: 2150,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=400',
    modules: 10,
    completionPercentage: 0,
  },
  {
    id: 5,
    title: 'Web Performance Optimization',
    description: 'Optimize web applications for speed, accessibility, and user experience.',
    instructor: 'David Lee',
    level: 'Advanced',
    price: 4499,
    duration: '8 weeks',
    students: 623,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400',
    modules: 18,
    completionPercentage: 0,
  },
  {
    id: 6,
    title: 'TypeScript for React Developers',
    description: 'Add type safety to your React applications with TypeScript.',
    instructor: 'Lisa Wang',
    level: 'Intermediate',
    price: 3299,
    duration: '5 weeks',
    students: 1089,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=400',
    modules: 14,
    completionPercentage: 0,
  },
];

export const MOCK_QUIZZES = {
  1: [
    {
      id: 101,
      title: 'React Components Quiz',
      courseId: 1,
      questions: [
        {
          id: 1,
          question: 'What is a React component?',
          options: [
            'A JavaScript function that returns JSX',
            'A CSS file',
            'A database table',
            'An HTML file',
          ],
          correct: 0,
        },
        {
          id: 2,
          question: 'How do you pass data to a component?',
          options: [
            'Through props',
            'Through CSS',
            'Through global variables',
            'Through HTML attributes only',
          ],
          correct: 0,
        },
        {
          id: 3,
          question: 'What hook is used for side effects?',
          options: [
            'useState',
            'useEffect',
            'useContext',
            'useReducer',
          ],
          correct: 1,
        },
        {
          id: 4,
          question: 'What does JSX stand for?',
          options: [
            'JavaScript Exchange',
            'JavaScript XML',
            'Java Syntax Extension',
            'JSON Extension',
          ],
          correct: 1,
        },
        {
          id: 5,
          question: 'How do you update state in a functional component?',
          options: [
            'this.state = newState',
            'Use setState method',
            'Use the useState hook',
            'Modify the variable directly',
          ],
          correct: 2,
        },
      ],
    },
  ],
  2: [
    {
      id: 201,
      title: 'JavaScript ES6 Features Quiz',
      courseId: 2,
      questions: [
        {
          id: 1,
          question: 'What is the difference between let and var?',
          options: [
            'No difference',
            'let is block-scoped, var is function-scoped',
            'var is better than let',
            'let cannot be redeclared',
          ],
          correct: 1,
        },
        {
          id: 2,
          question: 'What is async/await?',
          options: [
            'CSS properties',
            'Syntactic sugar for Promises',
            'HTML attributes',
            'A design pattern',
          ],
          correct: 1,
        },
      ],
    },
  ],
};

export const PLATFORMS_BENEFITS = [
  {
    id: 1,
    title: 'Interactive Exercises',
    description: 'Practice speaking, listening, reading and writing with engaging exercises.',
  },
  {
    id: 2,
    title: 'Progress Tracking',
    description: 'Monitor your language proficiency and see improvement over time.',
  },
  {
    id: 3,
    title: 'Native Speakers',
    description: 'Learn from native language instructors with cultural expertise.',
  },
  {
    id: 4,
    title: 'Real Conversations',
    description: 'Practice with authentic dialogues and real-world scenarios.',
  },
  {
    id: 5,
    title: 'Affordable Learning',
    description: 'Quality language education at competitive prices.',
  },
  {
    id: 6,
    title: 'Lifetime Access',
    description: 'Keep your course materials forever. Learn at your own pace.',
  },
];

export const PLATFORM_FEATURES = [
  {
    id: 1,
    title: 'Multiple Languages',
    description: 'Spanish, French, German, Japanese and more to choose from.',
  },
  {
    id: 2,
    title: 'CEFR Aligned',
    description: 'Courses structured according to international standards (A1-C2).',
  },
  {
    id: 3,
    title: 'Performance Feedback',
    description: 'Get detailed feedback on quizzes and exercises.',
  },
  {
    id: 4,
    title: 'Cultural Context',
    description: 'Learn languages with cultural insights and real-world usage.',
  },
];
