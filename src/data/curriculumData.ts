/**
 * MORE ENGLISH MORE LOVE - Unit 1: Back to School (العودة إلى المدرسة)
 * Supervisor & Teacher: Jaidaa Saqer (المعلمة جيداء صقر)
 */

export interface DialogueLineItem {
  id: string;
  speaker: string;
  speakerAr: string;
  avatar: string;
  role: 'student' | 'parent' | 'teacher';
  textEn: string;
  textAr: string;
}

export const DIALOGUE_ITEMS: DialogueLineItem[] = [
  {
    id: 'd1',
    speaker: 'John',
    speakerAr: 'جون',
    avatar: '👦',
    role: 'student',
    textEn: 'Carla! Are you ready?',
    textAr: 'كارلا! هل أنتِ مستعدة؟',
  },
  {
    id: 'd2',
    speaker: 'Carla',
    speakerAr: 'كارلا',
    avatar: '👧',
    role: 'student',
    textEn: "Yes, Dad. I'm very excited to meet my friends.",
    textAr: 'نعم، أبي. أنا متحمسة جداً لمقابلة أصدقائي.',
  },
  {
    id: 'd3',
    speaker: 'Dad',
    speakerAr: 'الأب',
    avatar: '👨',
    role: 'parent',
    textEn: "It's my first day at school.",
    textAr: 'إنه أول يوم لي في المدرسة.',
  },
  {
    id: 'd4',
    speaker: 'Ted',
    speakerAr: 'تيد',
    avatar: '👦',
    role: 'student',
    textEn: 'Hi, Ted! How are you?',
    textAr: 'مرحباً، تيد! كيف حالك؟',
  },
  {
    id: 'd5',
    speaker: 'John',
    speakerAr: 'جون',
    avatar: '👦',
    role: 'student',
    textEn: "I'm fine. Thank you.",
    textAr: 'أنا بخير. شكراً لك.',
  },
  {
    id: 'd6',
    speaker: 'John',
    speakerAr: 'جون',
    avatar: '👦',
    role: 'student',
    textEn: 'This is my sister Carla.',
    textAr: 'هذه أختي كارلا.',
  },
  {
    id: 'd7',
    speaker: 'Carla',
    speakerAr: 'كارلا',
    avatar: '👧',
    role: 'student',
    textEn: 'Look! That is a new pupil.',
    textAr: 'انظر! هذا تلميذ جديد.',
  },
  {
    id: 'd8',
    speaker: 'John',
    speakerAr: 'جون',
    avatar: '👦',
    role: 'student',
    textEn: "Let's talk to him.",
    textAr: 'لنذهب ونتحدث معه.',
  },
  {
    id: 'd9',
    speaker: 'Carla',
    speakerAr: 'كارلا',
    avatar: '👧',
    role: 'student',
    textEn: 'Good idea!',
    textAr: 'فكرة جيدة!',
  },
  {
    id: 'd10',
    speaker: 'John',
    speakerAr: 'جون',
    avatar: '👦',
    role: 'student',
    textEn: "Hello, I'm John.",
    textAr: 'مرحباً، أنا جون.',
  },
  {
    id: 'd11',
    speaker: 'Zak',
    speakerAr: 'زاك',
    avatar: '👱',
    role: 'student',
    textEn: "Hello, I'm Zak. I'm in grade three.",
    textAr: 'مرحباً، أنا زاك. أنا في الصف الثالث.',
  },
  {
    id: 'd12',
    speaker: 'Carla',
    speakerAr: 'كارلا',
    avatar: '👧',
    role: 'student',
    textEn: 'Where do you live, Zak?',
    textAr: 'أين تسكن يا زاك؟',
  },
  {
    id: 'd13',
    speaker: 'Zak',
    speakerAr: 'زاك',
    avatar: '👱',
    role: 'student',
    textEn: "I live in a flat with my parents and I've got a little brother.",
    textAr: 'أعيش في شقة مع والديّ ولدي أخ صغير.',
  },
  {
    id: 'd14',
    speaker: 'Miss Maria',
    speakerAr: 'الآنسة ماريا',
    avatar: '👩‍🏫',
    role: 'teacher',
    textEn: "Good morning. I'm Miss Maria.",
    textAr: 'صباح الخير. أنا الآنسة ماريا.',
  },
  {
    id: 'd15',
    speaker: 'Students',
    speakerAr: 'الطلاب',
    avatar: '👫',
    role: 'student',
    textEn: 'Good morning, Miss Maria.',
    textAr: 'صباح الخير، آنسة ماريا.',
  },
  {
    id: 'd16',
    speaker: 'Miss Maria',
    speakerAr: 'الآنسة ماريا',
    avatar: '👩‍🏫',
    role: 'teacher',
    textEn: 'Welcome back to school.',
    textAr: 'مرحباً بعودتكم إلى المدرسة.',
  },
];

export interface SongLine {
  id: string;
  en: string;
  ar: string;
  highlight?: boolean;
}

export const SONG_LINES: SongLine[] = [
  { id: 's1', en: 'Going back to school today.', ar: 'العودة إلى المدرسة اليوم.' },
  { id: 's2', en: 'Hip hip hurray!', ar: 'هيب هيب هوراي!', highlight: true },
  { id: 's3', en: 'Going to see my friends again.', ar: 'سأذهب لرؤية أصدقائي مرة أخرى.' },
  { id: 's4', en: "I can't wait.", ar: 'لا أستطيع الانتظار.' },
  { id: 's5', en: 'Going back to school today.', ar: 'العودة إلى المدرسة اليوم.' },
  { id: 's6', en: 'Hip hip hurray!', ar: 'هيب هيب هوراي!', highlight: true },
  { id: 's7', en: 'Lots of things to do today.', ar: 'الكثير من الأشياء لأفعلها اليوم.' },
  { id: 's8', en: 'I love my class.', ar: 'أحب صفي.' },
];

export interface PhonicsWord {
  id: string;
  word: string;
  arabicMeaning: string;
  sound: string;
  icon: string;
  example: string;
}

export const PHONICS_WORDS: PhonicsWord[] = [
  { id: 'p1', word: 'ZOO', arabicMeaning: 'حديقة الحيوانات', sound: 'oo', icon: '🦁', example: 'We see animals at the zoo.' },
  { id: 'p2', word: 'broom', arabicMeaning: 'مكنسة', sound: 'oo', icon: '🧹', example: 'Sweep the floor with a broom.' },
  { id: 'p3', word: 'school', arabicMeaning: 'مدرسة', sound: 'oo', icon: '🏫', example: 'Welcome back to school!' },
  { id: 'p4', word: 'book', arabicMeaning: 'كتاب', sound: 'oo', icon: '📖', example: 'I have got a green book.' },
  { id: 'p5', word: 'spoon', arabicMeaning: 'ملعقة', sound: 'oo', icon: '🥄', example: 'Eat soup with a spoon.' },
  { id: 'p6', word: 'moon', arabicMeaning: 'قمر', sound: 'oo', icon: '🌙', example: 'The moon is bright tonight.' },
];

export interface VocabularyItem {
  id: string;
  wordEn: string;
  wordAr: string;
  pronunciation: string;
  category: string;
  icon: string;
  sentenceEn: string;
  sentenceAr: string;
}

export const UNIT_VOCABULARY: VocabularyItem[] = [
  { id: 'v1', wordEn: 'Pupil', wordAr: 'تلميذ / تلميذة', pronunciation: '/ˈpjuː.pəl/', category: 'School', icon: '🎒', sentenceEn: 'Zak is a new pupil.', sentenceAr: 'زاك تلميذ جديد.' },
  { id: 'v2', wordEn: 'Grade three', wordAr: 'الصف الثالث', pronunciation: '/ɡreɪd θriː/', category: 'School', icon: '📚', sentenceEn: "I'm in grade three.", sentenceAr: 'أنا في الصف الثالث.' },
  { id: 'v3', wordEn: 'Flat', wordAr: 'شقة سكنية', pronunciation: '/flæt/', category: 'Home', icon: '🏢', sentenceEn: 'I live in a flat.', sentenceAr: 'أعيش في شقة.' },
  { id: 'v4', wordEn: 'Parents', wordAr: 'الوالدان (الأب والأم)', pronunciation: '/ˈpeə.rənts/', category: 'Family', icon: '👨‍👩‍👧', sentenceEn: 'They live with their parents.', sentenceAr: 'يعيشون مع والديهم.' },
  { id: 'v5', wordEn: 'Grandparents', wordAr: 'الأجداد (الجد والجدة)', pronunciation: '/ˈɡræn.peə.rənts/', category: 'Family', icon: '👵👴', sentenceEn: 'We love our grandparents.', sentenceAr: 'نحن نحب أجدادنا.' },
  { id: 'v6', wordEn: 'Little brother', wordAr: 'أخ صغير', pronunciation: '/ˈlɪt.əl ˈbrʌð.ər/', category: 'Family', icon: '👦', sentenceEn: "I've got a little brother.", sentenceAr: 'لدي أخ صغير.' },
  { id: 'v7', wordEn: 'Excited', wordAr: 'متحمس / مسرور', pronunciation: '/ɪkˈsaɪ.tɪd/', category: 'Emotions', icon: '✨', sentenceEn: "I'm very excited to meet my friends.", sentenceAr: 'أنا متحمس جداً لمقابلة أصدقائي.' },
  { id: 'v8', wordEn: 'Walk to school', wordAr: 'يمشي إلى المدرسة', pronunciation: '/wɔːk tuː skuːl/', category: 'School', icon: '🚶', sentenceEn: 'Sally walks to school.', sentenceAr: 'سالي تمشي إلى المدرسة.' },
  { id: 'v9', wordEn: 'Go by bus', wordAr: 'يذهب بالباص', pronunciation: '/ɡəʊ baɪ bʌs/', category: 'Travel', icon: '🚌', sentenceEn: 'I go to school by bus.', sentenceAr: 'أذهب إلى المدرسة بالباص.' },
  { id: 'v10', wordEn: 'Have got / Has got', wordAr: 'يمتلك / لديه', pronunciation: '/hæv ɡɒt/', category: 'Grammar', icon: '🔑', sentenceEn: 'We have got a big house.', sentenceAr: 'لدينا منزل كبير.' },
];
