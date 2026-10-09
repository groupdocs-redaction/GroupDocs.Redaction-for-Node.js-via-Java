import { Redactor } from '@groupdocs/groupdocs.redaction'
import java from 'java'
import { SampleFiles } from '#samples'

const ExactPhraseRedaction = java.import('com.groupdocs.redaction.redactions.ExactPhraseRedaction')
const ReplacementOptions = java.import('com.groupdocs.redaction.redactions.ReplacementOptions')

const redactor = new Redactor(SampleFiles.SAMPLE_DOCX)
try {
  redactor.apply(new ExactPhraseRedaction('John Doe', new ReplacementOptions('[personal]')))
  // Default save creates a redacted copy next to the source
  redactor.save()
} finally {
  redactor.close()
}
process.exit(0)
