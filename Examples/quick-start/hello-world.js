import { Redactor } from '@groupdocs/groupdocs.redaction'
import java from 'java'
import { SampleFiles } from '#samples'
import { outputPath } from '#output'

const ExactPhraseRedaction = java.import('com.groupdocs.redaction.redactions.ExactPhraseRedaction')
const ReplacementOptions = java.import('com.groupdocs.redaction.redactions.ReplacementOptions')
const RasterizationOptions = java.import('com.groupdocs.redaction.options.RasterizationOptions')
const FileOutputStream = java.import('java.io.FileOutputStream')
const Color = java.import('java.awt.Color')

const redactor = new Redactor(SampleFiles.SAMPLE_DOCX)
try {
  redactor.apply(new ExactPhraseRedaction('John Doe', new ReplacementOptions(Color.RED)))
  const rasterOptions = new RasterizationOptions()
  rasterOptions.setEnabled(false)
  const outFile = outputPath('hello-world', 'sample.docx')
  const stream = new FileOutputStream(outFile)
  redactor.save(stream, rasterOptions)
  stream.close()
  console.log('Source document was redacted successfully.\nFile saved at ' + outFile)
} finally {
  redactor.close()
}

process.exit(0)
