#!/usr/bin/env node
import { Command } from 'commander'
import { handleDownload } from '../utils/download.js'
import { readFile } from 'fs/promises'


const commander = new Command()

const json = JSON.parse(
  await readFile(
    new URL('../package.json', import.meta.url)
  )
)
commander.version(json.version)

// 定义一个新的命令 xxcli create xxx
commander
  .command('create <name>')
  .description('create project')
  .action(async (name) => {
    try {
      await handleDownload({ projectName: name })
    } catch(err) {
      throw new Error(err)
    }
  })
// process表示当前主进程
// argv 表示当前命令携带的参数
commander.parse(process.argv)