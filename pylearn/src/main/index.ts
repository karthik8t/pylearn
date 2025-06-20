import {app, ipcMain, protocol} from 'electron'

import {makeAppWithSingleInstanceLock} from 'lib/electron-app/factories/app/instance'
import {makeAppSetup} from 'lib/electron-app/factories/app/setup'
import {MainWindow} from './windows/main'
import {
  getUserProgress,
  loadDashboardData,
  loadInitData,
  loginUser,
  signupUser,
  updateUserProgress
} from "lib/services/user-service";
import * as path from "node:path";
import * as fs from "node:fs";
import getMimeType from "lib/electron-app/utils/util";
import {Progress} from "shared/types";

const protocolName = "img";
protocol.registerSchemesAsPrivileged([
  {scheme: protocolName, privileges: {bypassCSP: true}},
]);

makeAppWithSingleInstanceLock(async () => {
  await app.whenReady()

  protocol.handle('app', (request) => {
    const filePath = request.url.slice('app://'.length);
    const absolutePath = path.join(app.getAppPath(), filePath);
    return new Response(fs.createReadStream(absolutePath), {
      headers: {'Content-Type': getMimeType(absolutePath)} // Adjust content type as needed
    });
  });

  await makeAppSetup(MainWindow)
})


ipcMain.handle('initData', (_event, ...data) => {
  const response = loadInitData()
  return Promise.resolve(response)
})

// Handle signup data from renderer
ipcMain.on('signupUser', (_event, signupData) => {
  const response = signupUser(signupData)
})

ipcMain.handle('loginUser', async (_event, loginData) => {
  const response = await loginUser(loginData)
  return Promise.resolve(response)
})


ipcMain.handle('getUserProgress', async (_event, _data) => {
  const response = await getUserProgress()
  return Promise.resolve(response)
})

ipcMain.handle('updateUserProgress', async (_event, progress: Progress[]) => {
  const response = await updateUserProgress(progress)
  return Promise.resolve(response)
})

ipcMain.handle('getDashboardData', async (_event, _data) => {
  const response = await loadDashboardData()
  return Promise.resolve(response)
})
