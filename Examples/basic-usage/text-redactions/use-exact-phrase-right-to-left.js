import { Redactor } from '@groupdocs/groupdocs.redaction'
import java from 'java'
import { SampleFiles } from '#samples'
import { outputPath } from '#output'

const ExactPhraseRedaction = java.import('com.groupdocs.redaction.redactions.ExactPhraseRedaction')
const ReplacementOptions = java.import('com.groupdocs.redaction.redactions.ReplacementOptions')
const FileOutputStream = java.import('java.io.FileOutputStream')

const redactor = new Redactor(SampleFiles.ARABIC_PDF)
try {
  const redaction = new ExactPhraseRedaction('أﺑﺠﺪ', new ReplacementOptions('[test]'))
  redaction.setRightToLeft(true)
  redactor.apply(redaction)
  const outFile = outputPath('use-exact-phrase-right-to-left', 'use-exact-phrase-right-to-left_Arabic.pdf')
  const stream = new FileOutputStream(outFile)
  redactor.save(stream)
  stream.close()
} finally {
  redactor.close()
}
process.exit(0)
