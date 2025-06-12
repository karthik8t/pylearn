import {Concept, LoginSchema, Progress, SignupSchema, UserListSchema, UserSchema} from "shared/types";

export const signupUser = async (signupForm: SignupSchema) => {
  console.debug('Starting user signup process...');
  const defaultData: UserListSchema = [];
  console.debug('Default data initialized:', defaultData);

  const { Low } = await import('lowdb');
  const { JSONFile } = await import('lowdb/node');

  const adapter = new JSONFile<UserListSchema>('src/resources/public/db/users.json');
  const db = new Low<UserListSchema>(adapter, defaultData);

  await db.read();
  db.data = db.data || [];

  console.debug('Database loaded:', db.data);

  db.data.push(signupForm);

  await db.write();

  console.debug('User signup complete. Current users:', db.data);
  return db.data;
}


export const loginUser = async (loginForm: LoginSchema) => {
  console.debug('Starting user login process...');
  const defaultData: UserListSchema = [];
  const { Low } = await import('lowdb');
  const { JSONFile } = await import('lowdb/node');
  const adapter = new JSONFile<UserListSchema>('src/resources/public/db/users.json');
  const db = new Low<UserListSchema>(adapter, defaultData);

  await db.read();
  db.data = db.data || [];

  const userList: UserListSchema = db.data
  const user: UserSchema | undefined = userList.find(user => user.email === loginForm.email && user.password === loginForm.password)
  return user;
}

export const loadInitData = async () => {
  console.debug('Starting loadInitData process...');
  const defaultData: Concept[] = [];
  const { Low } = await import('lowdb');
  const { JSONFile } = await import('lowdb/node');
  const adapter = new JSONFile<Concept[]>('src/resources/public/db/concept_db.json');
  const db = new Low<Concept[]>(adapter, defaultData);
  await db.read()
  return db.data;
}

export const getUserProgress = async () => {
  console.debug('Starting getUserProgress process...');
  const defaultData: Progress[] = [];
  const {Low} = await import('lowdb');
  const {JSONFile} = await import('lowdb/node');
  const adapter = new JSONFile<Progress[]>('src/resources/public/db/user_progress.json');
  const db = new Low<Progress[]>(adapter, defaultData);
  await db.read();
  db.data = db.data || [];
  return db.data;
}

export const updateUserProgress = async (progress: Progress[]) => {
  console.debug('Starting updateUserProgress process...');
  const defaultData: Progress[] = [];
  const {Low} = await import('lowdb');
  const {JSONFile} = await import('lowdb/node');
  const adapter = new JSONFile<Progress[]>('src/resources/public/db/user_progress.json');
  const db = new Low<Progress[]>(adapter, defaultData);
  await db.read();
  db.data = db.data || [];

  // Update the progress in the database
  db.data = progress;

  await db.write();
  console.debug('User progress updated:', db.data);
  return db.data;
}

const conceptDifficulty = {
  'beginner': 1,
  'intermediate': 26,
  'advanced': 33
}

export const loadDashboardData = async () => {
  const concepts: Concept[] = await loadInitData();
  const userProgress: Progress[] = await getUserProgress();
  const conceptsOverTimeArray: { date: string, noOfConcepts: number }[] = [];
  for (let i = 0; i < 7; i++) {
    const now = new Date();
    now.setDate(now.getDate() - i);
    const dateKey = now.toLocaleDateString();
    const numberOfConcepts = userProgress.filter(p => {
      return p.read_on && new Date(Date.parse(p.read_on)).toLocaleDateString() == dateKey
    }).length;
    conceptsOverTimeArray.push({'date': dateKey, 'noOfConcepts': numberOfConcepts});
  }


  const readConceptIds = userProgress.filter(p => p.read).map(p => p.conceptId);
  console.debug('read concept ids:', readConceptIds);
  const readConcepts = concepts.filter(c => {
    console.debug('in filter:', c.id, readConceptIds.includes(c.id));
    return readConceptIds.includes(c.id);
  });
  const unreadConcepts = concepts.filter(c => !readConceptIds.includes(c.id));
  const difficultyCounts = {
    'beginner': 0,
    'intermediate': 0,
    'advanced': 0
  }
  console.debug('read concepts:', readConcepts);
  readConcepts.forEach(concept => {
    if (concept.difficulty in difficultyCounts) {
      difficultyCounts[concept.difficulty] += 1;
    }
  })

  const response: {
    'conceptsOverTime': { date: string, noOfConcepts: number }[],
    'conceptsMastery': { beginner: number, intermediate: number, advanced: number }
    'recommendedConcept'?: Concept,
    'bookmarkedConcepts': Concept[]
  } = {
    'conceptsOverTime': conceptsOverTimeArray.reverse(),
    'conceptsMastery': difficultyCounts,
    'recommendedConcept': unreadConcepts.length > 0 ? unreadConcepts[0] : undefined,
    'bookmarkedConcepts': concepts.filter(c => userProgress.find(p => p.conceptId === c.id && p.bookmarked))
  };
  console.debug('Dashboard data loaded:', response);
  return Promise.resolve(response)
}
