import {ConceptSchema, LoginSchema, SignupSchema, UserListSchema, UserSchema} from "shared/types";

export const signupUser = async (signupForm: SignupSchema) => {
  console.log('Starting user signup process...');
  const defaultData: UserListSchema = [];
  console.log('Default data initialized:', defaultData);

  const { Low } = await import('lowdb');
  const { JSONFile } = await import('lowdb/node');

  const adapter = new JSONFile<UserListSchema>('users.json');
  const db = new Low<UserListSchema>(adapter, defaultData);

  await db.read();
  db.data = db.data || [];

  console.log('Database loaded:', db.data);

  db.data.push(signupForm);

  await db.write();

  console.log('User signup complete. Current users:', db.data);
  return db.data;
}


export const loginUser = async (loginForm: LoginSchema) => {
  console.log('Starting user login process...');
  const defaultData: UserListSchema = [];
  const { Low } = await import('lowdb');
  const { JSONFile } = await import('lowdb/node');
  const adapter = new JSONFile<UserListSchema>('users.json');
  const db = new Low<UserListSchema>(adapter, defaultData);

  await db.read();
  db.data = db.data || [];

  const userList: UserListSchema = db.data
  const user: UserSchema | undefined = userList.find(user => user.email === loginForm.email && user.password === loginForm.password)
  return user;
}

export const getConcepts = async () => {
  console.log('Starting getConcepts process...');
  const defaultData: ConceptSchema[] = [];
  const { Low } = await import('lowdb');
  const { JSONFile } = await import('lowdb/node');
  const adapter = new JSONFile<ConceptSchema[]>('concepts.json');
  const db = new Low<ConceptSchema[]>(adapter, defaultData);
  await db.read();
  db.data = db.data || [];
  return db.data;
}
