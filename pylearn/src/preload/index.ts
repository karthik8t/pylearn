import {contextBridge, ipcRenderer} from 'electron'
import {LoginSchema, Progress, SignupSchema, UserSchema} from 'shared/types'

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

  getDashboardData: async () => {
    return await ipcRenderer.invoke("getDashboardData")
  },

  getUserProgress: async () => {
    return await ipcRenderer.invoke('getUserProgress')
  },
  updateUserProgress: async (progress: Progress[]) => {
    await ipcRenderer.invoke('updateUserProgress', progress)
  },

  registerUser: (signupForm: SignupSchema) => {
    ipcRenderer.send('signupUser', signupForm)
  },
  loginUser: async (loginForm: LoginSchema): Promise<UserSchema|undefined> => {
    return await ipcRenderer.invoke('loginUser', loginForm)
  },
  username: process.env.USER,
}

contextBridge.exposeInMainWorld('App', API)
