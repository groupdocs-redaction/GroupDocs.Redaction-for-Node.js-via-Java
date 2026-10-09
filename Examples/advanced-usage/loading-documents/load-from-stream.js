import { Redactor } from '@groupdocs/groupdocs.redaction'
import java from 'java'
import { SampleFiles } from '#samples'
import { outputPath } from '#output'

const DeleteAnnotationRedaction = java.import('com.groupdocs.redaction.redactions.DeleteAnnotationRedaction')
const RasterizationOptions = java.import('com.groupdocs.redaction.options.RasterizationOptions')
const FileInputStream = java.import('java.io.FileInputStream')
const FileOutputStream = java.import('java.io.FileOutputStream')

const input = new FileInputStream(SampleFiles.SAMPLE_DOCX)
try {
  const redactor = new Redactor(input)
  try {
    redactor.apply(new DeleteAnnotationRedaction())
    const rasterOptions = new RasterizationOptions()
    rasterOptions.setEnabled(false)
    const outFile = outputPath('load-from-stream', 'load-from-stream_sample.docx')
    const stream = new FileOutputStream(outFile)
    redactor.save(stream, rasterOptions)
    stream.close()
  } finally {
    redactor.close()
  }
} finally {
  input.close()
}
process.exit(0)
