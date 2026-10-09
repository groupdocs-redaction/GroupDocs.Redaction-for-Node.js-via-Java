import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { mkdirSync } from 'fs'

const examplesRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const samplesRoot = join(examplesRoot, 'Resources', 'SampleFiles')
const outputRoot = join(examplesRoot, 'output')

export function samplePath(...parts) {
  return join(samplesRoot, ...parts.map(String))
}

function outputDir(...parts) {
  const dir = join(outputRoot, ...parts.map(String))
  mkdirSync(dir, { recursive: true })
  return dir
}

export const SampleFiles = {
  SAMPLE_DOCX: samplePath('Doc', 'sample.docx'),
  PROTECTED_SAMPLE_DOCX: samplePath('Doc', 'protected_sample.docx'),
  OVERWRITTEN_SAMPLE_DOCX: samplePath('Doc', 'overwritten_sample.docx'),
  MULTIPAGE_SAMPLE_DOCX: samplePath('Doc', 'multipage_sample.docx'),
  SAMPLE_DUMP: samplePath('Doc', 'sample.dump'),
  SAMPLE_PDF_4OCR: samplePath('Pdf', 'OCR sample.pdf'),
  MULTIPAGE_PDF: samplePath('Pdf', 'Multipage.pdf'),
  LOREMIPSUM_PDF: samplePath('Pdf', 'LoremIpsum.pdf'),
  ARABIC_PDF: samplePath('Pdf', 'Arabic.pdf'),
  LOREMIPSUM_PPT: samplePath('Ppt', 'LoremIpsum.pptx'),
  ANNOTATED_XLSX: samplePath('Xls', 'sample1.xlsx'),
  SAMPLE_XLSX: samplePath('Xls', 'sample.xlsx'),
  SAMPLE_JPG: samplePath('Image', 'sample.jpg'),
  SAMPLE_EXIF_JPG: samplePath('Image', 'exif.jpg'),
  ANIMATED_GIF: samplePath('Image', 'sample.gif'),
  POLICY_FILE: samplePath('Bulk', 'RedactionPolicy.xml'),
  POLICY_INBOUND: samplePath('Bulk', 'Inbound'),
  POLICY_OUTBOUND_DONE: outputDir('Bulk', 'Outbound', 'Done'),
  POLICY_OUTBOUND_FAILED: outputDir('Bulk', 'Outbound', 'Failed'),
  POLICY_SAVE: samplePath('SamplePolicy.xml')
}

export { examplesRoot, samplesRoot }
