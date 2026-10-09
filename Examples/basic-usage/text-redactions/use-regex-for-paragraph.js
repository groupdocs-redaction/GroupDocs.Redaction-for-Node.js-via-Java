import { Redactor } from '@groupdocs/groupdocs.redaction'
import java from 'java'
import { SampleFiles } from '#samples'
import { outputPath } from '#output'

const RegexRedaction = java.import('com.groupdocs.redaction.redactions.RegexRedaction')
const ReplacementOptions = java.import('com.groupdocs.redaction.redactions.ReplacementOptions')
const RasterizationOptions = java.import('com.groupdocs.redaction.options.RasterizationOptions')
const FileOutputStream = java.import('java.io.FileOutputStream')

const redactor = new Redactor(SampleFiles.LOREMIPSUM_PDF)
try {
  redactor.apply(new RegexRedaction('(Lorem(\n|.)+?urna)', new ReplacementOptions('[test]')))
  const rasterOptions = new RasterizationOptions()
  rasterOptions.setEnabled(false)
  const outFile = outputPath('use-regex-for-paragraph', 'use-regex-for-paragraph_LoremIpsum.pdf')
  const stream = new FileOutputStream(outFile)
  redactor.save(stream, rasterOptions)
  stream.close()
} finally {
  redactor.close()
}
process.exit(0)
