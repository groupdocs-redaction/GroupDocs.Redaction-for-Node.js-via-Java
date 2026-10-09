import { License } from '@groupdocs/groupdocs.redaction'
import { existsSync, readdirSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const licenseDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'license')
mkdirSync(licenseDir, { recursive: true })
const licFile = readdirSync(licenseDir).find(f => f.toLowerCase().endsWith('.lic'))

if (!licFile || !existsSync(join(licenseDir, licFile))) {
  console.log('License file not found. Running in evaluation mode.')
  console.log('Put a .lic file into Examples/license/')
  process.exit(0)
}

const license = new License()
license.setLicense(join(licenseDir, licFile))
console.log('License set successfully.')
process.exit(0)
