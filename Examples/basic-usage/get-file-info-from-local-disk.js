import { Redactor } from '@groupdocs/groupdocs.redaction'
import { SampleFiles } from '#samples'

const redactor = new Redactor(SampleFiles.SAMPLE_DOCX)
try {
  const info = redactor.getDocumentInfo()
  console.log('File type: ' + info.getFileType())
  console.log('Page count: ' + info.getPageCount())
  console.log('File size: ' + info.getSize())
} finally {
  redactor.close()
}
process.exit(0)
