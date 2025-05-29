import {app, ipcMain} from 'electron'

import {makeAppWithSingleInstanceLock} from 'lib/electron-app/factories/app/instance'
import {makeAppSetup} from 'lib/electron-app/factories/app/setup'
import {MainWindow} from './windows/main'
import {getConcepts, loginUser, signupUser} from "lib/services/user-service";

makeAppWithSingleInstanceLock(async () => {
  await app.whenReady()
  await makeAppSetup(MainWindow)
})

// Handle signup data from renderer
ipcMain.on('signupUser', (_event, signupData) => {
  console.log('Signup data received in main:', signupData)
  const response = signupUser(signupData)
  console.log('Signup response in main:', response)
})

ipcMain.handle('loginUser', async (_event, loginData) => {
  console.log('Login data received in main:', loginData)
  const response = await loginUser(loginData)
  console.log('Login response in main:', response)
  return Promise.resolve(response)
})

ipcMain.handle('getConcepts', async (_event, _data) => {
  console.log('Get concepts in main')
  const response = await getConcepts()
  console.log('Get concepts response in main:', response)
  return Promise.resolve(response)
})


