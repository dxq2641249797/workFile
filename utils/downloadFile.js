export function downloadFile(name, url) {
  let filePath = ''
  if (url.includes('http://')) {
    filePath = '/' + url.split('/').slice(3).join('/')
  } else {
    filePath = '/' + url
  }
  const link = document.createElement('a')
  link.style.display = 'none'
  link.href = filePath
  link.setAttribute('download', name)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
