export interface CrashCourseTask {
  subject: string;
  task: string;
}

export interface CrashCourseDay {
  dayNumber: number;
  title: string;
  tasks: CrashCourseTask[];
}

export interface CrashCourseWeek {
  weekNumber: number;
  theme: string;
  quote: string;
  days: CrashCourseDay[];
}

export const crashCoursePlan: CrashCourseWeek[] = [
  {
    weekNumber: 1,
    theme: 'Foundation & Assessment',
    quote: '"The secret of getting ahead is getting started." — Mark Twain',
    days: [
      { dayNumber: 1, title: 'Physics: Electric Charges & Fields', tasks: [{ subject: 'Physics', task: 'Read NCERT Ch.1 Electric Charges and Fields' }, { subject: 'Physics', task: 'Solve 10 MCQs on Coulomb\'s Law' }, { subject: 'Physics', task: 'Make formula sheet for Ch.1' }] },
      { dayNumber: 2, title: 'Chemistry: Solid State', tasks: [{ subject: 'Chemistry', task: 'Read NCERT Ch.1 The Solid State' }, { subject: 'Chemistry', task: 'Learn crystal structures and defects' }, { subject: 'Chemistry', task: 'Solve previous year questions on Solid State' }] },
      { dayNumber: 3, title: 'Maths: Relations & Functions', tasks: [{ subject: 'Mathematics', task: 'Read NCERT Ch.1 Relations and Functions' }, { subject: 'Mathematics', task: 'Practice 20 problems on types of functions' }, { subject: 'Mathematics', task: 'Solve NCERT Exercise 1.1 and 1.2' }] },
      { dayNumber: 4, title: 'Biology: Reproduction', tasks: [{ subject: 'Biology', task: 'Read NCERT Ch.1 Reproduction in Organisms' }, { subject: 'Biology', task: 'Draw and label reproductive structures' }, { subject: 'Biology', task: 'Make notes on asexual vs sexual reproduction' }] },
      { dayNumber: 5, title: 'English: The Last Lesson', tasks: [{ subject: 'English', task: 'Read "The Last Lesson" by Alphonse Daudet' }, { subject: 'English', task: 'Write character sketches of Franz and M. Hamel' }, { subject: 'English', task: 'Practice 5 short answer questions' }] },
      { dayNumber: 6, title: 'Physics: Electrostatic Potential', tasks: [{ subject: 'Physics', task: 'Read NCERT Ch.2 Electrostatic Potential and Capacitance' }, { subject: 'Physics', task: 'Solve numericals on capacitors' }, { subject: 'Physics', task: 'Revise Ch.1 formulas' }] },
      { dayNumber: 7, title: 'Weekly Revision', tasks: [{ subject: 'All', task: 'Revise all topics covered this week' }, { subject: 'All', task: 'Solve 1 full mock test (any subject)' }, { subject: 'All', task: 'Update syllabus tracker' }] },
    ],
  },
  {
    weekNumber: 2,
    theme: 'Core Concepts Deep Dive',
    quote: '"Success is the sum of small efforts, repeated day in and day out." — Robert Collier',
    days: [
      { dayNumber: 8, title: 'Physics: Current Electricity', tasks: [{ subject: 'Physics', task: 'Read NCERT Ch.3 Current Electricity' }, { subject: 'Physics', task: 'Practice Kirchhoff\'s laws problems' }, { subject: 'Physics', task: 'Solve 15 numericals on resistance' }] },
      { dayNumber: 9, title: 'Chemistry: Solutions', tasks: [{ subject: 'Chemistry', task: 'Read NCERT Ch.2 Solutions' }, { subject: 'Chemistry', task: 'Learn colligative properties formulas' }, { subject: 'Chemistry', task: 'Solve problems on molarity and molality' }] },
      { dayNumber: 10, title: 'Maths: Inverse Trig Functions', tasks: [{ subject: 'Mathematics', task: 'Read NCERT Ch.2 Inverse Trigonometric Functions' }, { subject: 'Mathematics', task: 'Memorize all inverse trig formulas' }, { subject: 'Mathematics', task: 'Solve NCERT Exercise 2.1 and 2.2' }] },
      { dayNumber: 11, title: 'Biology: Sexual Reproduction', tasks: [{ subject: 'Biology', task: 'Read NCERT Ch.2 Sexual Reproduction in Flowering Plants' }, { subject: 'Biology', task: 'Draw and label flower parts' }, { subject: 'Biology', task: 'Learn pollination and fertilization process' }] },
      { dayNumber: 12, title: 'English: Lost Spring', tasks: [{ subject: 'English', task: 'Read "Lost Spring" by Anees Jung' }, { subject: 'English', task: 'Analyze themes of poverty and exploitation' }, { subject: 'English', task: 'Practice value-based questions' }] },
      { dayNumber: 13, title: 'Physics: Magnetism', tasks: [{ subject: 'Physics', task: 'Read NCERT Ch.4 Moving Charges and Magnetism' }, { subject: 'Physics', task: 'Learn Biot-Savart and Ampere\'s law' }, { subject: 'Physics', task: 'Solve 10 numericals on magnetic force' }] },
      { dayNumber: 14, title: 'Weekly Revision + Mock Test', tasks: [{ subject: 'All', task: 'Take full Physics mock test (Ch.1-4)' }, { subject: 'All', task: 'Review mistakes and weak areas' }, { subject: 'All', task: 'Plan next week\'s study schedule' }] },
    ],
  },
  {
    weekNumber: 3,
    theme: 'Advanced Topics',
    quote: '"Believe you can and you\'re halfway there." — Theodore Roosevelt',
    days: [
      { dayNumber: 15, title: 'Chemistry: Electrochemistry', tasks: [{ subject: 'Chemistry', task: 'Read NCERT Ch.3 Electrochemistry' }, { subject: 'Chemistry', task: 'Learn Nernst equation and applications' }, { subject: 'Chemistry', task: 'Solve problems on EMF and cell reactions' }] },
      { dayNumber: 16, title: 'Maths: Matrices', tasks: [{ subject: 'Mathematics', task: 'Read NCERT Ch.3 Matrices' }, { subject: 'Mathematics', task: 'Practice matrix operations and properties' }, { subject: 'Mathematics', task: 'Solve NCERT Exercise 3.1-3.4' }] },
      { dayNumber: 17, title: 'Biology: Human Reproduction', tasks: [{ subject: 'Biology', task: 'Read NCERT Ch.3 Human Reproduction' }, { subject: 'Biology', task: 'Draw male and female reproductive systems' }, { subject: 'Biology', task: 'Learn gametogenesis and fertilization' }] },
      { dayNumber: 18, title: 'Physics: Electromagnetic Induction', tasks: [{ subject: 'Physics', task: 'Read NCERT Ch.6 Electromagnetic Induction' }, { subject: 'Physics', task: 'Learn Faraday\'s and Lenz\'s laws' }, { subject: 'Physics', task: 'Solve 10 problems on induced EMF' }] },
      { dayNumber: 19, title: 'English: Deep Water + Indigo', tasks: [{ subject: 'English', task: 'Read "Deep Water" by William Douglas' }, { subject: 'English', task: 'Read "Indigo" by Louis Fischer' }, { subject: 'English', task: 'Compare themes of both stories' }] },
      { dayNumber: 20, title: 'Chemistry: Chemical Kinetics', tasks: [{ subject: 'Chemistry', task: 'Read NCERT Ch.4 Chemical Kinetics' }, { subject: 'Chemistry', task: 'Learn rate laws and Arrhenius equation' }, { subject: 'Chemistry', task: 'Solve problems on order of reaction' }] },
      { dayNumber: 21, title: 'Weekly Revision', tasks: [{ subject: 'All', task: 'Revise all topics from Week 3' }, { subject: 'All', task: 'Solve Chemistry mock test (Ch.1-4)' }, { subject: 'All', task: 'Update progress tracker' }] },
    ],
  },
  {
    weekNumber: 4,
    theme: 'Problem Solving Sprint',
    quote: '"The harder you work for something, the greater you\'ll feel when you achieve it."',
    days: [
      { dayNumber: 22, title: 'Maths: Determinants', tasks: [{ subject: 'Mathematics', task: 'Read NCERT Ch.4 Determinants' }, { subject: 'Mathematics', task: 'Practice Cramer\'s rule problems' }, { subject: 'Mathematics', task: 'Solve 20 problems on determinants' }] },
      { dayNumber: 23, title: 'Biology: Genetics - Mendel', tasks: [{ subject: 'Biology', task: 'Read NCERT Ch.5 Principles of Inheritance' }, { subject: 'Biology', task: 'Solve 10 Punnett square problems' }, { subject: 'Biology', task: 'Learn all Mendelian ratios' }] },
      { dayNumber: 24, title: 'Physics: Alternating Current', tasks: [{ subject: 'Physics', task: 'Read NCERT Ch.7 Alternating Current' }, { subject: 'Physics', task: 'Learn LC, LCR circuit formulas' }, { subject: 'Physics', task: 'Solve 10 AC circuit problems' }] },
      { dayNumber: 25, title: 'Chemistry: p-Block Elements', tasks: [{ subject: 'Chemistry', task: 'Read NCERT Ch.7 The p-Block Elements' }, { subject: 'Chemistry', task: 'Make table of properties and uses' }, { subject: 'Chemistry', task: 'Learn important reactions' }] },
      { dayNumber: 26, title: 'Maths: Continuity & Differentiability', tasks: [{ subject: 'Mathematics', task: 'Read NCERT Ch.5 Continuity and Differentiability' }, { subject: 'Mathematics', task: 'Practice chain rule and implicit differentiation' }, { subject: 'Mathematics', task: 'Solve 25 differentiation problems' }] },
      { dayNumber: 27, title: 'English: Poetry Section', tasks: [{ subject: 'English', task: 'Read all poems in Flamingo' }, { subject: 'English', task: 'Analyze "My Mother at Sixty-six"' }, { subject: 'English', task: 'Practice reference to context questions' }] },
      { dayNumber: 28, title: 'Full Mock Test Day', tasks: [{ subject: 'All', task: 'Take full Maths mock test (3 hours)' }, { subject: 'All', task: 'Analyze performance and weak areas' }, { subject: 'All', task: 'Revise formulas for weak topics' }] },
    ],
  },
  {
    weekNumber: 5,
    theme: 'Intensive Practice',
    quote: '"Don\'t watch the clock; do what it does. Keep going." — Sam Levenson',
    days: [
      { dayNumber: 29, title: 'Biology: Molecular Genetics', tasks: [{ subject: 'Biology', task: 'Read NCERT Ch.6 Molecular Basis of Inheritance' }, { subject: 'Biology', task: 'Learn DNA replication steps' }, { subject: 'Biology', task: 'Draw and explain transcription and translation' }] },
      { dayNumber: 30, title: 'Physics: Optics', tasks: [{ subject: 'Physics', task: 'Read NCERT Ch.9 Ray Optics' }, { subject: 'Physics', task: 'Solve 15 lens and mirror problems' }, { subject: 'Physics', task: 'Learn all optical instruments' }] },
      { dayNumber: 31, title: 'Chemistry: Coordination Compounds', tasks: [{ subject: 'Chemistry', task: 'Read NCERT Ch.9 Coordination Compounds' }, { subject: 'Chemistry', task: 'Learn IUPAC naming of complexes' }, { subject: 'Chemistry', task: 'Study isomerism in coordination compounds' }] },
      { dayNumber: 32, title: 'Maths: Application of Derivatives', tasks: [{ subject: 'Mathematics', task: 'Read NCERT Ch.6 Application of Derivatives' }, { subject: 'Mathematics', task: 'Practice maxima/minima problems' }, { subject: 'Mathematics', task: 'Solve 20 application problems' }] },
      { dayNumber: 33, title: 'English: Vistas (Supplementary)', tasks: [{ subject: 'English', task: 'Read "The Third Level" by Jack Finney' }, { subject: 'English', task: 'Read "The Tiger King"' }, { subject: 'English', task: 'Practice long answer questions' }] },
      { dayNumber: 34, title: 'Biology: Evolution', tasks: [{ subject: 'Biology', task: 'Read NCERT Ch.7 Evolution' }, { subject: 'Biology', task: 'Learn theories of evolution' }, { subject: 'Biology', task: 'Study Hardy-Weinberg principle' }] },
      { dayNumber: 35, title: 'Weekly Revision', tasks: [{ subject: 'All', task: 'Revise all Week 5 topics' }, { subject: 'All', task: 'Take Biology mock test' }, { subject: 'All', task: 'Update syllabus completion tracker' }] },
    ],
  },
  {
    weekNumber: 6,
    theme: 'Numerical Mastery',
    quote: '"Excellence is not a destination; it is a continuous journey that never ends." — Brian Tracy',
    days: [
      { dayNumber: 36, title: 'Physics: Dual Nature of Matter', tasks: [{ subject: 'Physics', task: 'Read NCERT Ch.11 Dual Nature of Radiation' }, { subject: 'Physics', task: 'Solve photoelectric effect problems' }, { subject: 'Physics', task: 'Learn de Broglie wavelength formula' }] },
      { dayNumber: 37, title: 'Chemistry: Haloalkanes', tasks: [{ subject: 'Chemistry', task: 'Read NCERT Ch.10 Haloalkanes and Haloarenes' }, { subject: 'Chemistry', task: 'Learn SN1 and SN2 mechanisms' }, { subject: 'Chemistry', task: 'Practice IUPAC naming of halogen compounds' }] },
      { dayNumber: 38, title: 'Maths: Integrals', tasks: [{ subject: 'Mathematics', task: 'Read NCERT Ch.7 Integrals' }, { subject: 'Mathematics', task: 'Practice integration by substitution' }, { subject: 'Mathematics', task: 'Solve 30 integration problems' }] },
      { dayNumber: 39, title: 'Biology: Human Health', tasks: [{ subject: 'Biology', task: 'Read NCERT Ch.8 Human Health and Disease' }, { subject: 'Biology', task: 'Learn about immunity and vaccines' }, { subject: 'Biology', task: 'Study common diseases and their causes' }] },
      { dayNumber: 40, title: 'Physics: Atoms & Nuclei', tasks: [{ subject: 'Physics', task: 'Read NCERT Ch.12 Atoms' }, { subject: 'Physics', task: 'Read NCERT Ch.13 Nuclei' }, { subject: 'Physics', task: 'Solve problems on radioactive decay' }] },
      { dayNumber: 41, title: 'Chemistry: Alcohols & Phenols', tasks: [{ subject: 'Chemistry', task: 'Read NCERT Ch.11 Alcohols, Phenols and Ethers' }, { subject: 'Chemistry', task: 'Learn preparation and properties' }, { subject: 'Chemistry', task: 'Practice reaction mechanisms' }] },
      { dayNumber: 42, title: 'Mock Test + Analysis', tasks: [{ subject: 'All', task: 'Take full Physics mock test (all chapters)' }, { subject: 'All', task: 'Detailed error analysis' }, { subject: 'All', task: 'Revise weak areas identified' }] },
    ],
  },
  {
    weekNumber: 7,
    theme: 'Integration & Application',
    quote: '"The only way to do great work is to love what you do." — Steve Jobs',
    days: [
      { dayNumber: 43, title: 'Maths: Application of Integrals', tasks: [{ subject: 'Mathematics', task: 'Read NCERT Ch.8 Application of Integrals' }, { subject: 'Mathematics', task: 'Practice area under curves problems' }, { subject: 'Mathematics', task: 'Solve 15 area problems' }] },
      { dayNumber: 44, title: 'Biology: Biotechnology', tasks: [{ subject: 'Biology', task: 'Read NCERT Ch.11 Biotechnology: Principles' }, { subject: 'Biology', task: 'Learn recombinant DNA technology' }, { subject: 'Biology', task: 'Study PCR and gel electrophoresis' }] },
      { dayNumber: 45, title: 'Chemistry: Aldehydes & Ketones', tasks: [{ subject: 'Chemistry', task: 'Read NCERT Ch.12 Aldehydes, Ketones and Carboxylic Acids' }, { subject: 'Chemistry', task: 'Learn nucleophilic addition reactions' }, { subject: 'Chemistry', task: 'Practice named reactions (Aldol, Cannizzaro)' }] },
      { dayNumber: 46, title: 'Physics: Semiconductors', tasks: [{ subject: 'Physics', task: 'Read NCERT Ch.14 Semiconductor Electronics' }, { subject: 'Physics', task: 'Learn p-n junction and transistor' }, { subject: 'Physics', task: 'Study logic gates' }] },
      { dayNumber: 47, title: 'Maths: Differential Equations', tasks: [{ subject: 'Mathematics', task: 'Read NCERT Ch.9 Differential Equations' }, { subject: 'Mathematics', task: 'Practice variable separable method' }, { subject: 'Mathematics', task: 'Solve 20 differential equation problems' }] },
      { dayNumber: 48, title: 'English: Writing Skills', tasks: [{ subject: 'English', task: 'Practice formal letter writing' }, { subject: 'English', task: 'Write 2 notice/advertisement samples' }, { subject: 'English', task: 'Practice article and speech writing' }] },
      { dayNumber: 49, title: 'Full Chemistry Mock Test', tasks: [{ subject: 'Chemistry', task: 'Take full Chemistry mock test (3 hours)' }, { subject: 'Chemistry', task: 'Analyze organic chemistry performance' }, { subject: 'Chemistry', task: 'Revise weak organic reactions' }] },
    ],
  },
  {
    weekNumber: 8,
    theme: 'Revision & Consolidation',
    quote: '"It always seems impossible until it\'s done." — Nelson Mandela',
    days: [
      { dayNumber: 50, title: 'Maths: Vectors', tasks: [{ subject: 'Mathematics', task: 'Read NCERT Ch.10 Vector Algebra' }, { subject: 'Mathematics', task: 'Practice dot and cross product problems' }, { subject: 'Mathematics', task: 'Solve 20 vector problems' }] },
      { dayNumber: 51, title: 'Biology: Ecology', tasks: [{ subject: 'Biology', task: 'Read NCERT Ch.13 Organisms and Populations' }, { subject: 'Biology', task: 'Read NCERT Ch.14 Ecosystem' }, { subject: 'Biology', task: 'Learn food chains and energy flow' }] },
      { dayNumber: 52, title: 'Chemistry: Amines & Biomolecules', tasks: [{ subject: 'Chemistry', task: 'Read NCERT Ch.13 Amines' }, { subject: 'Chemistry', task: 'Read NCERT Ch.14 Biomolecules' }, { subject: 'Chemistry', task: 'Learn structure of proteins, carbohydrates, DNA' }] },
      { dayNumber: 53, title: 'Maths: 3D Geometry', tasks: [{ subject: 'Mathematics', task: 'Read NCERT Ch.11 Three Dimensional Geometry' }, { subject: 'Mathematics', task: 'Practice direction cosines and ratios' }, { subject: 'Mathematics', task: 'Solve 15 3D geometry problems' }] },
      { dayNumber: 54, title: 'Physics: Complete Revision', tasks: [{ subject: 'Physics', task: 'Revise all formulas from Ch.1-8' }, { subject: 'Physics', task: 'Solve 30 mixed numericals' }, { subject: 'Physics', task: 'Review common mistakes' }] },
      { dayNumber: 55, title: 'Biology: Biodiversity', tasks: [{ subject: 'Biology', task: 'Read NCERT Ch.15 Biodiversity and Conservation' }, { subject: 'Biology', task: 'Read NCERT Ch.16 Environmental Issues' }, { subject: 'Biology', task: 'Learn conservation strategies' }] },
      { dayNumber: 56, title: 'Full Biology Mock Test', tasks: [{ subject: 'Biology', task: 'Take full Biology mock test (3 hours)' }, { subject: 'Biology', task: 'Analyze performance' }, { subject: 'Biology', task: 'Revise weak chapters' }] },
    ],
  },
  {
    weekNumber: 9,
    theme: 'Final Sprint',
    quote: '"Champions keep playing until they get it right." — Billie Jean King',
    days: [
      { dayNumber: 57, title: 'Maths: Linear Programming', tasks: [{ subject: 'Mathematics', task: 'Read NCERT Ch.12 Linear Programming' }, { subject: 'Mathematics', task: 'Practice graphical method problems' }, { subject: 'Mathematics', task: 'Solve 10 LPP problems' }] },
      { dayNumber: 58, title: 'Chemistry: Polymers & Everyday Chemistry', tasks: [{ subject: 'Chemistry', task: 'Read NCERT Ch.15 Polymers' }, { subject: 'Chemistry', task: 'Read NCERT Ch.16 Chemistry in Everyday Life' }, { subject: 'Chemistry', task: 'Learn classification of polymers and drugs' }] },
      { dayNumber: 59, title: 'Maths: Probability', tasks: [{ subject: 'Mathematics', task: 'Read NCERT Ch.13 Probability' }, { subject: 'Mathematics', task: 'Practice Bayes\' theorem problems' }, { subject: 'Mathematics', task: 'Solve 20 probability problems' }] },
      { dayNumber: 60, title: 'English: Complete Revision', tasks: [{ subject: 'English', task: 'Revise all Flamingo stories' }, { subject: 'English', task: 'Revise all Vistas stories' }, { subject: 'English', task: 'Practice grammar and writing sections' }] },
      { dayNumber: 61, title: 'Physics: Revision Ch.9-14', tasks: [{ subject: 'Physics', task: 'Revise optics, modern physics, semiconductors' }, { subject: 'Physics', task: 'Solve 30 mixed problems' }, { subject: 'Physics', task: 'Review all derivations' }] },
      { dayNumber: 62, title: 'Full Maths Mock Test', tasks: [{ subject: 'Mathematics', task: 'Take full Maths mock test (3 hours)' }, { subject: 'Mathematics', task: 'Analyze calculus performance' }, { subject: 'Mathematics', task: 'Revise weak areas' }] },
      { dayNumber: 63, title: 'All Subjects Revision', tasks: [{ subject: 'All', task: 'Quick revision of all subjects' }, { subject: 'All', task: 'Review formula sheets' }, { subject: 'All', task: 'Prepare for final sprint' }] },
    ],
  },
  {
    weekNumber: 10,
    theme: 'Peak Performance',
    quote: '"You are braver than you believe, stronger than you seem, and smarter than you think." — A.A. Milne',
    days: [
      { dayNumber: 64, title: 'Previous Year Papers - Physics', tasks: [{ subject: 'Physics', task: 'Solve 2022 Board paper (Physics)' }, { subject: 'Physics', task: 'Solve 2023 Board paper (Physics)' }, { subject: 'Physics', task: 'Note all repeated question patterns' }] },
      { dayNumber: 65, title: 'Previous Year Papers - Chemistry', tasks: [{ subject: 'Chemistry', task: 'Solve 2022 Board paper (Chemistry)' }, { subject: 'Chemistry', task: 'Solve 2023 Board paper (Chemistry)' }, { subject: 'Chemistry', task: 'Note all repeated question patterns' }] },
      { dayNumber: 66, title: 'Previous Year Papers - Maths', tasks: [{ subject: 'Mathematics', task: 'Solve 2022 Board paper (Maths)' }, { subject: 'Mathematics', task: 'Solve 2023 Board paper (Maths)' }, { subject: 'Mathematics', task: 'Note all repeated question patterns' }] },
      { dayNumber: 67, title: 'Previous Year Papers - Biology', tasks: [{ subject: 'Biology', task: 'Solve 2022 Board paper (Biology)' }, { subject: 'Biology', task: 'Solve 2023 Board paper (Biology)' }, { subject: 'Biology', task: 'Note all repeated question patterns' }] },
      { dayNumber: 68, title: 'Previous Year Papers - English', tasks: [{ subject: 'English', task: 'Solve 2022 Board paper (English)' }, { subject: 'English', task: 'Solve 2023 Board paper (English)' }, { subject: 'English', task: 'Practice writing section' }] },
      { dayNumber: 69, title: 'Sample Papers Day', tasks: [{ subject: 'All', task: 'Solve CBSE Sample Paper 2024 (Physics)' }, { subject: 'All', task: 'Solve CBSE Sample Paper 2024 (Chemistry)' }, { subject: 'All', task: 'Analyze and revise' }] },
      { dayNumber: 70, title: 'Comprehensive Revision', tasks: [{ subject: 'All', task: 'Revise all formula sheets' }, { subject: 'All', task: 'Review all diagrams and structures' }, { subject: 'All', task: 'Mental preparation and relaxation' }] },
    ],
  },
  {
    weekNumber: 11,
    theme: 'Exam Simulation',
    quote: '"The difference between ordinary and extraordinary is that little extra." — Jimmy Johnson',
    days: [
      { dayNumber: 71, title: 'Full Simulation - Physics', tasks: [{ subject: 'Physics', task: 'Full 3-hour Physics exam simulation' }, { subject: 'Physics', task: 'Strict exam conditions (no phone, no breaks)' }, { subject: 'Physics', task: 'Self-evaluate and score' }] },
      { dayNumber: 72, title: 'Full Simulation - Chemistry', tasks: [{ subject: 'Chemistry', task: 'Full 3-hour Chemistry exam simulation' }, { subject: 'Chemistry', task: 'Strict exam conditions' }, { subject: 'Chemistry', task: 'Self-evaluate and score' }] },
      { dayNumber: 73, title: 'Full Simulation - Maths', tasks: [{ subject: 'Mathematics', task: 'Full 3-hour Maths exam simulation' }, { subject: 'Mathematics', task: 'Strict exam conditions' }, { subject: 'Mathematics', task: 'Self-evaluate and score' }] },
      { dayNumber: 74, title: 'Full Simulation - Biology', tasks: [{ subject: 'Biology', task: 'Full 3-hour Biology exam simulation' }, { subject: 'Biology', task: 'Strict exam conditions' }, { subject: 'Biology', task: 'Self-evaluate and score' }] },
      { dayNumber: 75, title: 'Full Simulation - English', tasks: [{ subject: 'English', task: 'Full 3-hour English exam simulation' }, { subject: 'English', task: 'Strict exam conditions' }, { subject: 'English', task: 'Self-evaluate and score' }] },
      { dayNumber: 76, title: 'Error Analysis Day', tasks: [{ subject: 'All', task: 'Analyze all simulation results' }, { subject: 'All', task: 'List top 5 weak areas per subject' }, { subject: 'All', task: 'Create targeted revision plan' }] },
      { dayNumber: 77, title: 'Targeted Revision', tasks: [{ subject: 'All', task: 'Revise top weak areas from simulations' }, { subject: 'All', task: 'Practice specific problem types' }, { subject: 'All', task: 'Boost confidence with easy topics' }] },
    ],
  },
  {
    weekNumber: 12,
    theme: 'Final Countdown',
    quote: '"You didn\'t come this far to only come this far. Keep going!" 🏆',
    days: [
      { dayNumber: 78, title: 'Quick Revision - Physics', tasks: [{ subject: 'Physics', task: 'Revise all important formulas (1 hour)' }, { subject: 'Physics', task: 'Revise all important derivations' }, { subject: 'Physics', task: 'Solve 20 quick MCQs' }] },
      { dayNumber: 79, title: 'Quick Revision - Chemistry', tasks: [{ subject: 'Chemistry', task: 'Revise all named reactions' }, { subject: 'Chemistry', task: 'Revise all important equations' }, { subject: 'Chemistry', task: 'Solve 20 quick MCQs' }] },
      { dayNumber: 80, title: 'Quick Revision - Maths', tasks: [{ subject: 'Mathematics', task: 'Revise all formulas and theorems' }, { subject: 'Mathematics', task: 'Practice 10 problems per chapter' }, { subject: 'Mathematics', task: 'Revise integration formulas' }] },
      { dayNumber: 81, title: 'Quick Revision - Biology', tasks: [{ subject: 'Biology', task: 'Revise all diagrams' }, { subject: 'Biology', task: 'Revise all important terms' }, { subject: 'Biology', task: 'Solve 20 quick MCQs' }] },
      { dayNumber: 82, title: 'Quick Revision - English', tasks: [{ subject: 'English', task: 'Revise all story summaries' }, { subject: 'English', task: 'Revise all poem themes' }, { subject: 'English', task: 'Practice 5 writing tasks' }] },
      { dayNumber: 83, title: 'Light Study + Rest', tasks: [{ subject: 'All', task: 'Light revision of notes (2 hours max)' }, { subject: 'All', task: 'Prepare stationery and admit card' }, { subject: 'All', task: 'Sleep early — 8 hours minimum' }] },
      { dayNumber: 84, title: 'Mental Preparation', tasks: [{ subject: 'All', task: 'Meditation and breathing exercises' }, { subject: 'All', task: 'Positive affirmations' }, { subject: 'All', task: 'Light walk and healthy meal' }] },
    ],
  },
  {
    weekNumber: 13,
    theme: "Exam Week — You've Got This!",
    quote: '"This is your moment. You\'ve prepared for this. Go show the world what you\'re made of!" 🌟',
    days: [
      { dayNumber: 85, title: 'Pre-Exam Day 1', tasks: [{ subject: 'All', task: 'Review only formula sheets (30 min)' }, { subject: 'All', task: 'Pack bag: pens, pencils, admit card, ID' }, { subject: 'All', task: 'Sleep by 10 PM' }] },
      { dayNumber: 86, title: 'Exam Day 1', tasks: [{ subject: 'All', task: 'Wake up early, eat healthy breakfast' }, { subject: 'All', task: 'Reach exam center 30 min early' }, { subject: 'All', task: 'Read all questions before answering' }] },
      { dayNumber: 87, title: 'Post-Exam Recovery', tasks: [{ subject: 'All', task: 'Do NOT discuss answers after exam' }, { subject: 'All', task: 'Rest and relax for 2 hours' }, { subject: 'All', task: 'Light revision for next exam' }] },
      { dayNumber: 88, title: 'Exam Day 2', tasks: [{ subject: 'All', task: 'Stay calm and confident' }, { subject: 'All', task: 'Attempt all questions' }, { subject: 'All', task: 'Manage time: 1 mark = 1 minute' }] },
      { dayNumber: 89, title: 'Exam Day 3', tasks: [{ subject: 'All', task: 'Trust your preparation' }, { subject: 'All', task: 'Write neat and structured answers' }, { subject: 'All', task: 'Draw diagrams wherever applicable' }] },
      { dayNumber: 90, title: 'Final Day — Celebrate!', tasks: [{ subject: 'All', task: 'Give your best in the final exam' }, { subject: 'All', task: 'You have completed the 90-day journey!' }, { subject: 'All', task: '🎉 Celebrate — you are a champion!' }] },
    ],
  },
];
