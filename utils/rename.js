import fs from 'fs'

export function renamePackageJson (name) {
  const json = JSON.parse(fs.readFileSync('../package.json', 'utf-8'))
  json.name = name
  fs.writeFileSync('../package.json', JSON.stringify(json))
}
