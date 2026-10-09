import { Redactor } from '@groupdocs/groupdocs.redaction'
import java from 'java'
import { SampleFiles } from '#samples'
import { outputPath } from '#output'

const PreviewOptions = java.import('com.groupdocs.redaction.options.PreviewOptions')
const PreviewFormats = java.import('com.groupdocs.redaction.options.PreviewFormats')
const FileOutputStream = java.import('java.io.FileOutputStream')

const testPageNumber = 1
const previewFileName = outputPath('get-document-page-preview', `sample_page${testPageNumber}.png`)

const createPageStream = java.newProxy('com.groupdocs.redaction.options.ICreatePageStream', {
  createPageStream: (_pageNumber) => new FileOutputStream(previewFileName)
})

const redactor = new Redactor(SampleFiles.SAMPLE_DOCX)
try {
  const options = new PreviewOptions(createPageStream)
  options.setHeight(640)
  options.setWidth(480)
  options.setPageNumbers(java.newArray('int', [testPageNumber]))
  options.setPreviewFormat(PreviewFormats.Png)
  redactor.generatePreview(options)
  console.log(`Preview for page: ${testPageNumber} was saved to "${previewFileName}"`)
} finally {
  redactor.close()
}
process.exit(0)
