import { contextBridge, ipcRenderer } from 'electron'
import { SignupSchema } from 'shared/types'

declare global {
  interface Window {
    App: typeof API
  }
}

const API = {
  sayHelloFromBridge: () => console.log('\nHello from bridgeAPI! 👋\n\n'),
  registerUser: (signupForm: SignupSchema) => {
    // Send signup data to main process
    ipcRenderer.send('signup:submit', signupForm)
  },
  username: process.env.USER,
}

contextBridge.exposeInMainWorld('App', API)
