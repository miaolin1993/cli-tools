#!/usr/bin/env node
import { Command } from 'commander'
import { handleDownload } from '../utils/download.js'
import { readFile } from 'fs/promises'
import inquirer from 'inquirer'


const commander = new Command()

const json = JSON.parse(
  await readFile(
    new URL('../package.json', import.meta.url)
  )
)
commander.version(json.version)

const promptOption = [
  {
    type: "list",
    name: "technology",
    message: "Select your technology(only React). ",
    choices: ["React", "Vue"]
  },
  {
    type: "input",
    name: "projectName",
    message: "Input your project name.",
  },
]

const hander = {
  init: env => {
    inquirer
      .prompt(promptOption)
      .then(async option => {
        const { projectName } = option
        await handleDownload({ projectName })
      })
  }
}

commander.arguments("<cmd> [env]").action(function(cmd, env) {
  if (hander[cmd]) return hander[cmd](env)
  console.log(`很抱歉，暂未实现该${cmd}命令`)
})

commander.parse(process.argv)
