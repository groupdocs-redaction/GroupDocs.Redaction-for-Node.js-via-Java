import { License } from '@groupdocs/groupdocs.redaction'
import java from 'java'
import { existsSync, readdirSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const FileInputStream = java.import('java.io.FileInputStream')

const licenseDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'license')
mkdirSync(licenseDir, { recursive: true })
const licFile = readdirSync(licenseDir).find(f => f.toLowerCase().endsWith('.lic'))

if (!licFile || !existsSync(join(licenseDir, licFile))) {
  console.log('License file not found. Running in evaluation mode.')
  process.exit(0)
}

const stream = new FileInputStream(join(licenseDir, licFile))
try {
  const license = new License()
  license.setLicense(stream)
  console.log('License set successfully from stream.')
} finally {
  stream.close()
}
process.exit(0)
