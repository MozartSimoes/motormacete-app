#!/usr/bin/env node
/**
 * Wrapper para expo export:embed em monorepo pnpm.
 * - Sinaliza que é um release build nativo via EXPO_NATIVE_RELEASE_BUILD=1
 *   para que metro.config.js ajuste o serverRoot corretamente.
 * - Muda cwd para apps/mobile para que Expo detecte o project root correto.
 */
const path = require('path')
const { spawnSync } = require('child_process')

const appRoot = path.resolve(__dirname, '..')
const realCli = require.resolve('@expo/cli', { paths: [path.resolve(appRoot, 'node_modules')] })
const args = process.argv.slice(2)

const env = { ...process.env, EXPO_NATIVE_RELEASE_BUILD: '1' }

const result = spawnSync(process.execPath, [realCli, ...args], {
  stdio: 'inherit',
  cwd: appRoot,
  env,
})

process.exit(result.status || 0)
