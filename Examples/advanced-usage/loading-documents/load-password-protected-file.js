import { Redactor } from '@groupdocs/groupdocs.redaction'
import java from 'java'
import { SampleFiles } from '#samples'
import { outputPath } from '#output'

const LoadOptions = java.import('com.groupdocs.redaction.options.LoadOptions')
const ExactPhraseRedaction = java.import('com.groupdocs.redaction.redactions.ExactPhraseRedaction')
const ReplacementOptions = java.import('com.groupdocs.redaction.redactions.ReplacementOptions')
const RasterizationOptions = java.import('com.groupdocs.redaction.options.RasterizationOptions')
const FileOutputStream = java.import('java.io.FileOutputStream')

const loadOptions = new LoadOptions('mypassword')
const redactor = new Redactor(SampleFiles.PROTECTED_SAMPLE_DOCX, loadOptions)
try {
  redactor.apply(new ExactPhraseRedaction('John Doe', new ReplacementOptions('[personal]')))
  const rasterOptions = new RasterizationOptions()
  rasterOptions.setEnabled(false)
  const outFile = outputPath('load-password-protected-file', 'load-password-protected-file_protected_sample.docx')
  const stream = new FileOutputStream(outFile)
  redactor.save(stream, rasterOptions)
  stream.close()
} finally {
  redactor.close()
}
process.exit(0)
