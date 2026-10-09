import { fileURLToPath, pathToFileURL } from 'url'
import { dirname, join } from 'path'
import { execSync } from 'child_process'
import { existsSync, readdirSync, mkdirSync } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const licenseDir = join(__dirname, 'license')
const applyLicenseModule = pathToFileURL(join(__dirname, 'utils', 'apply-license.js')).href

const YELLOW = '\x1b[93m'
const GREEN = '\x1b[92m'
const RED = '\x1b[91m'
const RESET = '\x1b[0m'

function printIntro() {
  console.log(`
=================================================================
GroupDocs.Redaction for Node.js via Java Examples
=================================================================
Runs sample scripts for redacting text, metadata, annotations,
images, pages, and saving in original or rasterized formats.
Put a .lic file into the license folder to disable evaluation mode.
=================================================================
`)
}

function resolveLicensePath() {
  mkdirSync(licenseDir, { recursive: true })
  const licFile = readdirSync(licenseDir).find(f => f.toLowerCase().endsWith('.lic'))
  return licFile ? join(licenseDir, licFile) : null
}

function printLicenseStatus() {
  const licensePath = resolveLicensePath()
  if (licensePath && existsSync(licensePath)) {
    console.log(`${GREEN}License found: ${licensePath}${RESET}\n`)
  } else {
    console.log(`${YELLOW}No .lic file in ${licenseDir}. Running in evaluation mode.${RESET}\n`)
  }
}

const examples = [
  'quick-start/set-license-from-file.js',
  'quick-start/set-license-from-stream.js',
  'quick-start/set-metered-license.js',
  'quick-start/hello-world.js',

  'basic-usage/redaction-basics/apply-redaction.js',
  'basic-usage/redaction-basics/apply-multiple-redactions.js',

  'basic-usage/text-redactions/use-exact-phrase-redaction.js',
  'basic-usage/text-redactions/use-exact-phrase-case-sensitive.js',
  'basic-usage/text-redactions/use-colored-rectangle.js',
  'basic-usage/text-redactions/use-exact-phrase-right-to-left.js',
  'basic-usage/text-redactions/use-regular-expression.js',
  'basic-usage/text-redactions/use-regex-for-paragraph.js',

  'basic-usage/metadata-redactions/clean-metadata.js',
  'basic-usage/metadata-redactions/clean-metadata-with-filter.js',
  'basic-usage/metadata-redactions/redact-metadata.js',
  'basic-usage/metadata-redactions/redact-metadata-with-filter.js',

  'basic-usage/annotation-redactions/remove-all-annotations.js',
  'basic-usage/annotation-redactions/remove-annotations.js',
  'basic-usage/annotation-redactions/redact-annotations.js',

  'basic-usage/spreadsheet-redactions/filter-by-spreadsheet-and-column.js',

  'basic-usage/image-redactions/redact-image-area.js',
  'basic-usage/image-redactions/clean-image-metadata.js',
  'basic-usage/image-redactions/redact-embedded-images.js',

  'basic-usage/remove-page-redactions/remove-page-range.js',
  'basic-usage/remove-page-redactions/remove-last-page.js',
  'basic-usage/remove-page-redactions/remove-frame-from-image.js',

  'basic-usage/get-supported-file-formats.js',
  'basic-usage/get-file-info-from-local-disk.js',
  'basic-usage/get-file-info-from-stream.js',
  'basic-usage/get-document-page-preview.js',

  'advanced-usage/loading-documents/load-from-local-disc.js',
  'advanced-usage/loading-documents/load-from-stream.js',
  'advanced-usage/loading-documents/load-password-protected-file.js',
  'advanced-usage/loading-documents/load-with-file-type.js',
  'advanced-usage/loading-documents/pre-rasterize.js',
  'advanced-usage/loading-documents/use-advanced-logging.js',

  'advanced-usage/saving-documents/save-in-original-format.js',
  'advanced-usage/saving-documents/save-in-rasterized-pdf.js',
  'advanced-usage/saving-documents/save-overwriting-original-file.js',
  'advanced-usage/saving-documents/save-to-stream.js',
  'advanced-usage/saving-documents/save-with-default-options.js',
  'advanced-usage/saving-documents/save-word-with-ooxml-compliance.js',
  'advanced-usage/saving-documents/select-specific-pages-for-rasterized-pdf.js',
  'advanced-usage/saving-documents/use-advanced-rasterization-options.js',
  'advanced-usage/saving-documents/use-border-rasterization-option.js',
  'advanced-usage/saving-documents/use-grayscale-rasterization-option.js',
  'advanced-usage/saving-documents/use-noise-rasterization-option.js',
  'advanced-usage/saving-documents/use-tilt-rasterization-option.js',

  'advanced-usage/using-redaction-filters/use-pdf-redaction-filters.js',
  'advanced-usage/using-redaction-filters/use-page-area-redaction-pdf.js',
  'advanced-usage/using-redaction-filters/use-page-area-redaction-ppt.js',

  'advanced-usage/custom-redaction/custom-redaction.js',
  'advanced-usage/custom-redaction/custom-redaction-ai.js',

  'advanced-usage/create-redaction-policy.js',
  'advanced-usage/use-redaction-policy.js',
  'advanced-usage/use-redaction-callback.js'
]

printIntro()
printLicenseStatus()

let successfulExamples = 0
let failedExamples = 0
const totalExamples = examples.length

for (const example of examples) {
  const examplePath = join(__dirname, example)
  const exampleDir = dirname(examplePath)

  console.log(`${YELLOW}Running ${example}...${RESET}`)
  try {
    execSync(`node --import ${JSON.stringify(applyLicenseModule)} ${JSON.stringify(examplePath)}`, {
      cwd: exampleDir,
      stdio: 'inherit',
      env: process.env
    })
    console.log(`${GREEN}Completed ${example}${RESET}\n`)
    successfulExamples++
  } catch (e) {
    console.log(`${RED}Error running ${example}: ${e.message}${RESET}\n`)
    failedExamples++
  }
}

console.log('=================================================================')
console.log(`${GREEN}Summary:${RESET}`)
console.log(`  Total examples: ${totalExamples}`)
console.log(`  Successful: ${GREEN}${successfulExamples}${RESET}`)
if (failedExamples > 0) {
  console.log(`  Failed: ${RED}${failedExamples}${RESET}`)
} else {
  console.log(`  Failed: ${GREEN}${failedExamples}${RESET}`)
}
console.log('=================================================================')
console.log(`${GREEN}Done${RESET}`)

process.exit(0)
