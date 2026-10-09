import { Redactor } from '@groupdocs/groupdocs.redaction'
import java from 'java'
import { SampleFiles } from '#samples'
import { outputPath } from '#output'

const ExactPhraseRedaction = java.import('com.groupdocs.redaction.redactions.ExactPhraseRedaction')
const RegexRedaction = java.import('com.groupdocs.redaction.redactions.RegexRedaction')
const DeleteAnnotationRedaction = java.import('com.groupdocs.redaction.redactions.DeleteAnnotationRedaction')
const EraseMetadataRedaction = java.import('com.groupdocs.redaction.redactions.EraseMetadataRedaction')
const MetadataFilters = java.import('com.groupdocs.redaction.redactions.MetadataFilters')
const ReplacementOptions = java.import('com.groupdocs.redaction.redactions.ReplacementOptions')
const RasterizationOptions = java.import('com.groupdocs.redaction.options.RasterizationOptions')
const RedactionStatus = java.import('com.groupdocs.redaction.RedactionStatus')
const FileOutputStream = java.import('java.io.FileOutputStream')
const Color = java.import('java.awt.Color')

const redactor = new Redactor(SampleFiles.SAMPLE_DOCX)
try {
  const redactionList = java.newArray('com.groupdocs.redaction.Redaction', [
    new ExactPhraseRedaction('John Doe', new ReplacementOptions('[Client]')),
    new RegexRedaction('Redaction', new ReplacementOptions('[Product]')),
    new RegexRedaction('\\d{2}\\s*\\d{2}[^\\d]*\\d{6}', new ReplacementOptions(Color.BLUE)),
    new DeleteAnnotationRedaction(),
    new EraseMetadataRedaction(MetadataFilters.All)
  ])
  const result = redactor.apply(redactionList)
  if (result.getStatus() !== RedactionStatus.Failed) {
    const rasterOptions = new RasterizationOptions()
    rasterOptions.setEnabled(false)
    const outFile = outputPath('apply-multiple-redactions', 'apply-multiple-redactions_sample.docx')
    const stream = new FileOutputStream(outFile)
    redactor.save(stream, rasterOptions)
    stream.close()
  } else {
    const log = result.getRedactionLog()
    for (let i = 0; i < log.size(); i++) {
      const entry = log.get(i)
      if (entry.getResult().getStatus() !== RedactionStatus.Applied) {
        console.log(entry.getRedaction().getClass().getName() + ' status is ' +
          entry.getResult().getStatus() + ', details: ' + entry.getResult().getErrorMessage())
      }
    }
  }
} finally {
  redactor.close()
}
process.exit(0)
