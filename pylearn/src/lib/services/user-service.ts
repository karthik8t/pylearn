import {SignupSchema, UserListSchema, UserSchema} from "shared/types";
import {JSONFileSyncPreset} from "lowdb/node";
import {LowSync} from "lowdb";

export const signupUser = (signupForm: SignupSchema) => {
  console.log('Starting user signup process...');
  const defaultData: UserListSchema = [];
  console.log('Default data initialized:', defaultData);
  const db: LowSync<UserListSchema> = JSONFileSyncPreset<UserListSchema>('users.json', defaultData);
  console.log('Database loaded:', db.data);
  db.update((data) => {
    console.log('Adding new user:', signupForm);
    data.push(signupForm);
  });
  console.log('User signup complete. Current users:', db.data);
  return db.data;
}
