import { Redactor } from '@groupdocs/groupdocs.redaction'
import java from 'java'
import { SampleFiles } from '#samples'

const FileInputStream = java.import('java.io.FileInputStream')

const stream = new FileInputStream(SampleFiles.SAMPLE_DOCX)
try {
  const redactor = new Redactor(stream)
  try {
    const info = redactor.getDocumentInfo()
    console.log('File type: ' + info.getFileType())
    console.log('Page count: ' + info.getPageCount())
    console.log('File size: ' + info.getSize())
  } finally {
    redactor.close()
  }
} finally {
  stream.close()
}
process.exit(0)
