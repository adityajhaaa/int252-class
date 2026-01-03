import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import User from './models/User.js';
import Course from './models/Course.js';
import Quiz from './models/Quiz.js';

dotenv.config();

connectDB();

const MOCK_COURSES = [
  {
    title: 'Italian for Travelers (A1-A2)',
    description: 'Essential Italian for your next trip! Learn practical phrases, restaurant vocabulary, and cultural tips.',
    instructor: 'Giuseppe Romano',
    level: 'A1',
    price: 2499,
    duration: '6 weeks',
    students: 2890,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=400',
    modules: [
      {
        title: 'Essential Greetings & Basics',
        duration: '2h',
        lessons: [
          { title: 'Ciao! - Greetings in Italian', duration: '12m', type: 'video' },
          { title: 'Introducing Yourself', duration: '18m', type: 'video' },
          { title: 'Numbers 1-100', duration: '15m', type: 'video' },
          { title: 'Speaking Practice: Introduction', duration: '25m', type: 'exercise' },
        ],
      },
      {
        title: 'At the Restaurant',
        duration: '3h',
        lessons: [
          { title: 'Food Vocabulary', duration: '20m', type: 'video' },
          { title: 'Ordering Food', duration: '25m', type: 'video' },
          { title: 'Restaurant Dialogues', duration: '30m', type: 'exercise' },
          { title: 'Italian Cuisine Culture', duration: '20m', type: 'video' },
        ],
      },
      {
        title: 'Getting Around',
        duration: '2h 30m',
        lessons: [
          { title: 'Directions & Transportation', duration: '22m', type: 'video' },
          { title: 'Asking for Help', duration: '18m', type: 'video' },
          { title: 'Travel Scenarios Practice', duration: '35m', type: 'exercise' },
        ],
      },
    ],
  },
  {
    title: 'Mandarin Chinese Essentials (A1)',
    description: 'Begin your Mandarin journey! Master Pinyin, essential characters, and basic conversations.',
    instructor: 'Wei Zhang',
    level: 'A1',
    price: 3799,
    duration: '12 weeks',
    students: 1650,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1516321318423-f06f70d504f0?w=400',
    modules: [
      {
        title: 'Pinyin & Pronunciation',
        duration: '4h',
        lessons: [
          { title: 'Introduction to Pinyin', duration: '30m', type: 'video' },
          { title: 'The Four Tones', duration: '35m', type: 'video' },
          { title: 'Tone Practice Exercises', duration: '45m', type: 'exercise' },
          { title: 'Common Pinyin Mistakes', duration: '25m', type: 'video' },
        ],
      },
      {
        title: 'Basic Characters',
        duration: '5h',
        lessons: [
          { title: 'Radicals and Strokes', duration: '40m', type: 'video' },
          { title: 'First 50 Characters', duration: '1h', type: 'video' },
          { title: 'Writing Practice', duration: '1h 20m', type: 'exercise' },
          { title: 'Character Recognition', duration: '45m', type: 'exercise' },
        ],
      },
      {
        title: 'Daily Conversations',
        duration: '3h',
        lessons: [
          { title: 'Self-Introduction in Chinese', duration: '30m', type: 'video' },
          { title: 'Shopping & Numbers', duration: '35m', type: 'video' },
          { title: 'Conversation Practice', duration: '50m', type: 'exercise' },
        ],
      },
    ],
  },
  {
    title: 'Portuguese for Brazil (A2-B1)',
    description: 'Speak Brazilian Portuguese confidently! Learn colloquial expressions and cultural nuances.',
    instructor: 'Gabriela Silva',
    level: 'A2',
    price: 2999,
    duration: '8 weeks',
    students: 1245,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1516321318423-f06f70d504f0?w=400',
    modules: [
      {
        title: 'Brazilian Pronunciation',
        duration: '2h 30m',
        lessons: [
          { title: 'Vowel Sounds in Brazilian Portuguese', duration: '25m', type: 'video' },
          { title: 'The Carioca Accent', duration: '20m', type: 'video' },
          { title: 'Pronunciation Drills', duration: '40m', type: 'exercise' },
        ],
      },
      {
        title: 'Everyday Conversations',
        duration: '4h',
        lessons: [
          { title: 'Making Friends in Brazil', duration: '30m', type: 'video' },
          { title: 'Slang and Informal Speech', duration: '35m', type: 'video' },
          { title: 'Role-play Scenarios', duration: '50m', type: 'exercise' },
          { title: 'Brazilian Culture & Customs', duration: '30m', type: 'video' },
        ],
      },
      {
        title: 'Intermediate Grammar',
        duration: '3h 30m',
        lessons: [
          { title: 'Present Perfect vs Simple Past', duration: '30m', type: 'video' },
          { title: 'Subjunctive Mood Basics', duration: '40m', type: 'video' },
          { title: 'Grammar Exercises', duration: '55m', type: 'exercise' },
        ],
      },
    ],
  },
  {
    title: 'Korean Language & Culture (A1-A2)',
    description: 'Learn Korean script (Hangul), grammar fundamentals, and K-culture insights.',
    instructor: 'Min-Ji Park',
    level: 'A1',
    price: 3299,
    duration: '10 weeks',
    students: 3420,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1516321318423-f06f70d504f0?w=400',
    modules: [
      {
        title: 'Hangul Mastery',
        duration: '3h',
        lessons: [
          { title: 'Introduction to Hangul', duration: '20m', type: 'video' },
          { title: 'Consonants and Vowels', duration: '35m', type: 'video' },
          { title: 'Reading Practice', duration: '40m', type: 'exercise' },
          { title: 'Writing Hangul', duration: '45m', type: 'exercise' },
        ],
      },
      {
        title: 'Basic Korean Grammar',
        duration: '4h',
        lessons: [
          { title: 'Sentence Structure Basics', duration: '30m', type: 'video' },
          { title: 'Particles and Markers', duration: '40m', type: 'video' },
          { title: 'Present Tense Verbs', duration: '35m', type: 'video' },
          { title: 'Grammar Drills', duration: '50m', type: 'exercise' },
        ],
      },
      {
        title: 'Korean Culture & Etiquette',
        duration: '2h 30m',
        lessons: [
          { title: 'Honorifics and Politeness Levels', duration: '35m', type: 'video' },
          { title: 'Korean Social Customs', duration: '30m', type: 'video' },
          { title: 'Cultural Practice Scenarios', duration: '45m', type: 'exercise' },
        ],
      },
    ],
  },
  {
    title: 'Arabic for Beginners (A1)',
    description: 'Start with Modern Standard Arabic. Learn the alphabet, pronunciation, and essential phrases.',
    instructor: 'Ahmed Al-Mansour',
    level: 'A1',
    price: 3599,
    duration: '12 weeks',
    students: 980,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1516321318423-f06f70d504f0?w=400',
    modules: [
      {
        title: 'Arabic Alphabet',
        duration: '5h',
        lessons: [
          { title: 'Introduction to Arabic Script', duration: '30m', type: 'video' },
          { title: 'Letters and Sounds (Part 1)', duration: '45m', type: 'video' },
          { title: 'Letters and Sounds (Part 2)', duration: '45m', type: 'video' },
          { title: 'Writing Practice', duration: '1h', type: 'exercise' },
          { title: 'Reading Simple Words', duration: '50m', type: 'exercise' },
        ],
      },
      {
        title: 'Basic Phrases',
        duration: '3h',
        lessons: [
          { title: 'Greetings and Introductions', duration: '30m', type: 'video' },
          { title: 'Common Expressions', duration: '35m', type: 'video' },
          { title: 'Conversation Practice', duration: '50m', type: 'exercise' },
        ],
      },
    ],
  },
  {
    title: 'Russian Language Course (B1)',
    description: 'Intermediate Russian for confident speakers. Advanced grammar and literature insights.',
    instructor: 'Natalia Volkova',
    level: 'B1',
    price: 3999,
    duration: '14 weeks',
    students: 756,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1516321318423-f06f70d504f0?w=400',
    modules: [
      {
        title: 'Case System Mastery',
        duration: '5h',
        lessons: [
          { title: 'Genitive and Dative Cases', duration: '50m', type: 'video' },
          { title: 'Instrumental and Prepositional', duration: '50m', type: 'video' },
          { title: 'Case Practice Exercises', duration: '1h 20m', type: 'exercise' },
        ],
      },
      {
        title: 'Verbs of Motion',
        duration: '4h',
        lessons: [
          { title: 'Unidirectional vs Multidirectional', duration: '45m', type: 'video' },
          { title: 'Prefixed Verbs of Motion', duration: '50m', type: 'video' },
          { title: 'Motion Verb Drills', duration: '1h', type: 'exercise' },
        ],
      },
    ],
  },
];

const MOCK_QUIZZES = [
  {
    courseTitle: 'Italian for Travelers (A1-A2)',
    title: 'Italian A1 Basics Quiz',
    questions: [
      {
        text: 'How do you say "Good morning" in Italian?',
        options: ['Buonasera', 'Buongiorno', 'Ciao', 'Arrivederci'],
        correct: 1,
      },
      {
        text: 'What is "thank you" in Italian?',
        options: ['Prego', 'Grazie', 'Scusi', 'Per favore'],
        correct: 1,
      },
      {
        text: 'Which word means "water"?',
        options: ['Vino', 'Caffè', 'Acqua', 'Latte'],
        correct: 2,
      },
      {
        text: 'How do you ask "Where is the bathroom?"',
        options: [
          'Dov\'è il bagno?',
          'Come stai?',
          'Quanto costa?',
          'Che ore sono?',
        ],
        correct: 0,
      },
      {
        text: 'What does "per favore" mean?',
        options: ['Thank you', 'Please', 'Excuse me', 'Goodbye'],
        correct: 1,
      },
    ],
  },
  {
    courseTitle: 'Mandarin Chinese Essentials (A1)',
    title: 'Mandarin Pinyin & Tones',
    questions: [
      {
        text: 'Which tone is "mā" (mother)?',
        options: ['First tone (flat)', 'Second tone (rising)', 'Third tone (dip)', 'Fourth tone (falling)'],
        correct: 0,
      },
      {
        text: 'What does "nǐ hǎo" mean?',
        options: ['Goodbye', 'Thank you', 'Hello', 'Sorry'],
        correct: 2,
      },
      {
        text: 'Which character means "person"?',
        options: ['山', '人', '水', '火'],
        correct: 1,
      },
      {
        text: 'How many tones are there in Mandarin Chinese?',
        options: ['3', '4', '5', '6'],
        correct: 2,
      },
    ],
  },
  {
    courseTitle: 'Portuguese for Brazil (A2-B1)',
    title: 'Brazilian Portuguese Quiz',
    questions: [
      {
        text: 'How do you say "How are you?" informally in Brazilian Portuguese?',
        options: ['Como vai?', 'Tudo bem?', 'Oi', 'Obrigado'],
        correct: 1,
      },
      {
        text: 'What does "saudade" mean?',
        options: [
          'Hello',
          'A deep longing or nostalgia',
          'Goodbye',
          'Thank you',
        ],
        correct: 1,
      },
      {
        text: 'Which is a common Brazilian slang for "cool"?',
        options: ['Legal', 'Ruim', 'Feio', 'Triste'],
        correct: 0,
      },
      {
        text: 'What is "obrigado" used for?',
        options: ['Hello', 'Thank you', 'Goodbye', 'Please'],
        correct: 1,
      },
    ],
  },
  {
    courseTitle: 'Korean Language & Culture (A1-A2)',
    title: 'Korean Hangul & Grammar',
    questions: [
      {
        text: 'How do you say "Hello" formally in Korean?',
        options: ['안녕', '감사합니다', '안녕하세요', '죄송합니다'],
        correct: 2,
      },
      {
        text: 'What is the basic word order in Korean?',
        options: ['SVO (Subject-Verb-Object)', 'VSO', 'SOV (Subject-Object-Verb)', 'OSV'],
        correct: 2,
      },
      {
        text: 'Which particle marks the subject in a sentence?',
        options: ['을/를', '이/가', '에', '의'],
        correct: 1,
      },
      {
        text: 'What does "감사합니다" mean?',
        options: ['Hello', 'Goodbye', 'Thank you', 'Sorry'],
        correct: 2,
      },
      {
        text: 'How many letters are in Hangul?',
        options: ['14', '24', '28', '32'],
        correct: 1,
      },
    ],
  },
  {
    courseTitle: 'Arabic for Beginners (A1)',
    title: 'Arabic Alphabet & Basics',
    questions: [
      {
        text: 'How many letters are in the Arabic alphabet?',
        options: ['26', '28', '30', '32'],
        correct: 1,
      },
      {
        text: 'What direction is Arabic written?',
        options: ['Left to right', 'Right to left', 'Top to bottom', 'Bottom to top'],
        correct: 1,
      },
      {
        text: 'What does "السلام عليكم" (As-salamu alaykum) mean?',
        options: [
          'Goodbye',
          'Peace be upon you',
          'Thank you',
          'Good morning',
        ],
        correct: 1,
      },
      {
        text: 'Which language family does Arabic belong to?',
        options: ['Indo-European', 'Sino-Tibetan', 'Semitic', 'Turkic'],
        correct: 2,
      },
    ],
  },
  {
    courseTitle: 'Russian Language Course (B1)',
    title: 'Russian Case System',
    questions: [
      {
        text: 'How many cases does Russian have?',
        options: ['4', '5', '6', '7'],
        correct: 2,
      },
      {
        text: 'What case answers the question "to whom?" or "for whom?"',
        options: ['Nominative', 'Genitive', 'Dative', 'Accusative'],
        correct: 2,
      },
      {
        text: 'Which case is used after the preposition "о" (about)?',
        options: ['Nominative', 'Genitive', 'Accusative', 'Prepositional'],
        correct: 3,
      },
      {
        text: 'What does "спасибо" mean?',
        options: ['Hello', 'Goodbye', 'Thank you', 'Please'],
        correct: 2,
      },
    ],
  },
];

const importData = async () => {
  try {
    await Course.deleteMany();
    await User.deleteMany();
    await Quiz.deleteMany();

    const createdUser = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'password123',
      role: 'admin',
    });

    const instructorUser = await User.create({
      name: 'Instructor User',
      email: 'instructor@example.com',
      password: 'password123',
      role: 'instructor',
    });

    const sampleCourses = MOCK_COURSES.map((course) => {
      return { ...course, user: instructorUser._id };
    });

    const createdCourses = await Course.insertMany(sampleCourses);

    // Map quizzes to created courses
    const sampleQuizzes = [];
    for (const quizData of MOCK_QUIZZES) {
      const course = createdCourses.find(c => c.title === quizData.courseTitle);
      if (course) {
        sampleQuizzes.push({
          courseId: course._id,
          title: quizData.title,
          questions: quizData.questions
        });
      }
    }

    if (sampleQuizzes.length > 0) {
      await Quiz.insertMany(sampleQuizzes);
    }

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Course.deleteMany();
    await User.deleteMany();
    await Quiz.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
