import { Redactor } from '@groupdocs/groupdocs.redaction'
import java from 'java'
import { SampleFiles } from '#samples'
import { outputPath } from '#output'

const LoadOptions = java.import('com.groupdocs.redaction.options.LoadOptions')
const ExactPhraseRedaction = java.import('com.groupdocs.redaction.redactions.ExactPhraseRedaction')
const ReplacementOptions = java.import('com.groupdocs.redaction.redactions.ReplacementOptions')
const FileOutputStream = java.import('java.io.FileOutputStream')
const Color = java.import('java.awt.Color')

const loadOptions = new LoadOptions(true)
const redactor = new Redactor(SampleFiles.SAMPLE_DOCX, loadOptions)
try {
  redactor.apply(new ExactPhraseRedaction('John Doe', new ReplacementOptions(Color.RED)))
  const outFile = outputPath('pre-rasterize', 'pre-rasterize_sample.pdf')
  const stream = new FileOutputStream(outFile)
  redactor.save(stream)
  stream.close()
} finally {
  redactor.close()
}
process.exit(0)
