import { Redactor } from '@groupdocs/groupdocs.redaction'
import java from 'java'
import { copyFileSync } from 'fs'
import { SampleFiles } from '#samples'

const ExactPhraseRedaction = java.import('com.groupdocs.redaction.redactions.ExactPhraseRedaction')
const ReplacementOptions = java.import('com.groupdocs.redaction.redactions.ReplacementOptions')
const SaveOptions = java.import('com.groupdocs.redaction.options.SaveOptions')
const RedactionStatus = java.import('com.groupdocs.redaction.RedactionStatus')
const Color = java.import('java.awt.Color')

copyFileSync(SampleFiles.SAMPLE_DOCX, SampleFiles.OVERWRITTEN_SAMPLE_DOCX)

const redactor = new Redactor(SampleFiles.OVERWRITTEN_SAMPLE_DOCX)
try {
  const result = redactor.apply(new ExactPhraseRedaction('John Doe', new ReplacementOptions(Color.RED)))
  if (result.getStatus() !== RedactionStatus.Failed) {
    const options = new SaveOptions()
    options.setAddSuffix(false)
    options.setRasterizeToPDF(false)
    redactor.save(options)
  }
} finally {
  redactor.close()
}
process.exit(0)
