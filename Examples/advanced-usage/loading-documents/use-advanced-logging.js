import { Redactor } from '@groupdocs/groupdocs.redaction'
import java from 'java'
import { SampleFiles } from '#samples'
import { outputPath } from '#output'

const DeleteAnnotationRedaction = java.import('com.groupdocs.redaction.redactions.DeleteAnnotationRedaction')
const LoadOptions = java.import('com.groupdocs.redaction.options.LoadOptions')
const RedactorSettings = java.import('com.groupdocs.redaction.options.RedactorSettings')
const RasterizationOptions = java.import('com.groupdocs.redaction.options.RasterizationOptions')
const FileOutputStream = java.import('java.io.FileOutputStream')

let errorCount = 0
const logger = java.newProxy('com.groupdocs.redaction.options.ILogger', {
  error: (message) => { errorCount++; console.error('[ERROR] ' + message) },
  warning: (message) => { console.warn('[WARN] ' + message) },
  trace: (message) => { console.log('[TRACE] ' + message) }
})

const redactor = new Redactor(SampleFiles.SAMPLE_DOCX, new LoadOptions(), new RedactorSettings(logger))
try {
  redactor.apply(new DeleteAnnotationRedaction())
  if (errorCount === 0) {
    const rasterOptions = new RasterizationOptions()
    rasterOptions.setEnabled(false)
    const outFile = outputPath('use-advanced-logging', 'use-advanced-logging_sample.docx')
    const stream = new FileOutputStream(outFile)
    redactor.save(stream, rasterOptions)
    stream.close()
  }
} finally {
  redactor.close()
}
process.exit(0)
