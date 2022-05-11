/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/naming-convention */
// ------------------------------------------------------


// FOR USE IN my-circle-screen1, add-edit-circle1, daily-record-add-person-screen1
export const SOCIAL_GROUPS = [
  { groupName: 'Family', groupCode: 'FAML', groupImg: 'family.svg' },
  { groupName: 'Friends', groupCode: 'FRND', groupImg: 'friends.svg' },
  { groupName: 'Social club', groupCode: 'SOCL', groupImg: 'social-club.svg' },
  { groupName: 'Sport', groupCode: 'SPRT', groupImg: 'sport.svg' },
  { groupName: 'Professional', groupCode: 'PROF', groupImg: 'professional.svg' },
  { groupName: 'Voluntary', groupCode: 'VOLN', groupImg: 'volunteering.svg' },
  { groupName: 'Learning', groupCode: 'LEAR', groupImg: 'learning.svg' },
  { groupName: 'Neighbourhood', groupCode: 'NBOR', groupImg: 'neighbourhood.svg' },
  { groupName: 'Faith', groupCode: 'FATH', groupImg: 'faith.svg' },
  { groupName: 'Political', groupCode: 'POLI', groupImg: 'political.svg' },
  { groupName: 'Other group', groupCode: 'OTHR', groupImg: 'other.svg' }
];

export const HOW_CLOSE = {
  INNER_CIRCLE: 1,
  MIDDLE_CIRCLE: 2,
  OUTER_CIRCLE: 3,
};
export const HOW_OFTEN = {
  Daily: 1,
  Weekly: 2,
  Fortnightly: 3,
  Monthly: 4,
  Yearly: 5
};
// TEMPORARY section1 EDNs --

// ===================================  FOR GETTING USER PROFILE DATA - START  ===============
// Wellbeing fields:
// Here are the new fields for the Wellbeing records, which I have modelled as
// an extension of the Mood records. To filter, use the field include_wellbeing as a flag:
// If it is True, then the further fields below will be populated. If it is False,
// then only the Mood fields ((user, current_mood, and time) will be populated.
export const PASTIME_CHOICES = {
  TV: 'TV',
  EXER: 'Exercise',
  ART: 'Arts & Crafts',
  COOK: 'Cooking',
  READ: 'Reading',
  SOC:  'Socialising',
  GARD: 'Gardening',
  COMP: 'Computer',
  HYG:  'Hygiene',
  CLEN: 'Cleaning',
  VOL:  'Volunteering',
  MUS:  'Music',
  WORK: 'Working',
  HELP: 'Helping',
  OTHER: 'Other'
};

export const LIKES_DISLIKES_CHOICES = {
  SPRT: 'Sport',
  READ: 'Reading',
  MUSC: 'Music',
  TELE: 'Television',
  VGAM: 'Videogames',
  WALK: 'Walking',
  KNIT: 'Knitting',
};

export const GENDER_CHOICES = {
  WOM: 'Woman',
  MAN: 'Man',
  NBIN: 'Non-binary',
  PNTD: 'Prefer not to disclose',
  PTSD: 'Prefer to self describe',
};

export const ETHNIC_CHOICES = {
  WHTE: 'White',
  MXED: 'Mixed/Multiple ethnic groups',
  ASIN: 'Asian/Asian British',
  BLCK: 'Black/African/Caribbean/Black British',
  CHIN: 'Chinese',
  ARAB: 'Arab',
  OTHR: 'Other',
};

export const EDUCATION_CHOICES = {
  NONE: 'No qualifications',
  GCE1: '1-4 GCSEs, Scottish Standard Grade',
  GCE5: '5 or more GCSEs, Scottish Higher, Scottish Advanced Higher',
  APRT: 'Apprenticeship',
  ALEV: '2 or more A-levels, HNC, HND, SVQ level 4',
  DEGR: 'First or higher degree',
  OTHR: 'Other vocational / work related qualifications',
};

export const DISABILITY_CHOICES = {
  NONE: 'No disability',
  MILD: 'Mild to moderate disability',
  MODD: 'Moderate disability',
  SVDS: 'Severe disability',
  VERY: 'Very severe disability',
};

export const MARITAL_CHOICES = {
  SING: 'Single, never married or civil partnered',
  MARR: 'Married, including separatedy (this category includes those in both opposite-sex and same-sex marriages)',
  CIVL: 'Civil partnered, including separated ',
  DIVD: 'Divorced, including legally dissolved civil partners',
  WIDO: 'Widowed, including surviving civil partners',
};

export const HEALTH_CHOICES = {
  0: 'No health problems',
  1: 'Arms or hands',
  2: 'Back or neck',
  3: 'Difficulty in seeing',
  4: 'Difficulty in hearing',
  5: 'Speech impediment',
  6: 'Skin conditions, allergies',
  7: 'Chest, breathing problems',
  8: 'Heart, blood, blood pressure, circulation',
  9: 'Stomach, liver, kidney, digestion',
  10: 'Diabetes',
  11: 'Depression, bad nerves',
  12: 'Epilepsy',
  13: 'Learning difficulties',
  14: 'Mental illness, phobia, panics',
  15: 'Progressive illness n.e.c.',
  16: 'Other problems, disabilities',
};
// ===================================  FOR GETTING USER PROFILE DATA - END  ===============

// ===================================  USED WITH Moods (screens: 'My Mood' and 'Daily Record' and 'My History') - START  ===============
// Available mood values:
export const MOODS_FOR_DISPLAY = {
  NONE: 'none',
  ANGR: 'Angry',
  AFRA: 'Afraid',
  ASTO: 'Astonished',
  EXCI: 'Excited',
  HAPP: 'Happy',
  FRUS: 'Frustrated',
  TENS: 'Tense',
  ALAR: 'Alarmed',
  DELI: 'Delighted',
  GLAD: 'Glad',
  DIST: 'Distressed',
  ANNO: 'Annoyed',
  NEUT: 'Neutral',
  PLEA: 'Pleased',
  CONT: 'Content',
  DEPR: 'Depressed',
  MISR: 'Miserable',
  SLEEP: 'Sleepy',
  ATEA: 'At Ease',
  SATI: 'Satisfied',
  BORE: 'Bored',
  SAD: 'Sad',
  TIRE: 'Tired',
  CALM: 'Calm',
  RELA: 'Relaxed'
};
// ===================================  USED WITH Moods - END  ===============
