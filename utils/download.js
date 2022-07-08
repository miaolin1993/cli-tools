import download from 'download-git-repo'
import path from 'path'
import ora from 'ora'

// 项目代码所在地址
const repoUrl = 'direct:https://github.com/miaolin1993/test-cli/archive/refs/heads/master.zip'

// 下载主方法
function downloadTemplate(options) {
  return new Promise((resolve) => {
    const CURRENT_PATH = process.cwd() // 获取当前路径 如果想把包放在别的路径可以改这里
    const { projectName } = options // 获取用户填写的内容 这里主要获取用户输入的名称
    const targetPath = path.resolve(CURRENT_PATH, projectName) // 目标路径
    download(repoUrl, targetPath, {}, (err) => {
      if (err) resolve(false)
      resolve(true)
    })
  })
}

// 处理下载事件
async function handleDownload(options) {
  const newOra = ora('start download...').start()
  try {
    const downloadResult = await downloadTemplate(options)
    downloadResult
      ? newOra.succeed('download  success')
      : newOra.fail('download fail')
  } catch (err) {
    console.log(err)
    newOra.fail('download fail')
  }
}

export { handleDownload }