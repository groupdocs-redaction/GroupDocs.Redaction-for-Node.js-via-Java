import { Redactor } from '@groupdocs/groupdocs.redaction'
import java from 'java'
import { SampleFiles } from '#samples'

const ExactPhraseRedaction = java.import('com.groupdocs.redaction.redactions.ExactPhraseRedaction')
const ReplacementOptions = java.import('com.groupdocs.redaction.redactions.ReplacementOptions')
const SaveOptions = java.import('com.groupdocs.redaction.options.SaveOptions')
const WordProcessingComplianceLevel = java.import('com.groupdocs.redaction.options.WordProcessingComplianceLevel')

const redactor = new Redactor(SampleFiles.SAMPLE_DOCX)
try {
  redactor.apply(new ExactPhraseRedaction('John Doe', new ReplacementOptions('[personal]')))
  const options = new SaveOptions()
  options.setAddSuffix(true)
  options.setRasterizeToPDF(false)
  options.setRedactedFileSuffix('Strict')
  options.getWordprocessingSaveOptions().setOoxmlCompliance(WordProcessingComplianceLevel.Strict)
  redactor.save(options)
} finally {
  redactor.close()
}
process.exit(0)
