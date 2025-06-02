import { contextBridge, ipcRenderer } from 'electron'
import {LoginSchema, SignupSchema, UserSchema} from 'shared/types'

declare global {
  interface Window {
    App: typeof API
  }
}

const API = {
  sayHelloFromBridge: () => console.log('\nHello from bridgeAPI! 👋\n\n'),

  initData: async () => {
    return await ipcRenderer.invoke('initData')
  },

  registerUser: (signupForm: SignupSchema) => {
    ipcRenderer.send('signupUser', signupForm)
  },
  loginUser: async (loginForm: LoginSchema): Promise<UserSchema|undefined> => {
    return await ipcRenderer.invoke('loginUser', loginForm)
  },
  getConcepts: async () => {
    return await ipcRenderer.invoke('getConcepts')
  },
  username: process.env.USER,
}

contextBridge.exposeInMainWorld('App', API)
