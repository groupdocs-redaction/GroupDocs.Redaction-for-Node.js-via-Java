import { Redactor } from '@groupdocs/groupdocs.redaction'
import java from 'java'
import { SampleFiles } from '#samples'
import { outputPath } from '#output'

const ExactPhraseRedaction = java.import('com.groupdocs.redaction.redactions.ExactPhraseRedaction')
const ReplacementOptions = java.import('com.groupdocs.redaction.redactions.ReplacementOptions')
const RasterizationOptions = java.import('com.groupdocs.redaction.options.RasterizationOptions')
const FileOutputStream = java.import('java.io.FileOutputStream')

const redactor = new Redactor(SampleFiles.MULTIPAGE_SAMPLE_DOCX)
try {
  redactor.apply(new ExactPhraseRedaction('John Doe', new ReplacementOptions('[personal]')))
  const rasterOptions = new RasterizationOptions()
  rasterOptions.setEnabled(true)
  rasterOptions.setPageIndex(0)
  rasterOptions.setPageCount(1)
  const outFile = outputPath('select-specific-pages-for-rasterized-pdf', 'select-specific-pages-for-rasterized-pdf_multipage_sample.pdf')
  const stream = new FileOutputStream(outFile)
  redactor.save(stream, rasterOptions)
  stream.close()
} finally {
  redactor.close()
}
process.exit(0)
