import { Redactor } from '@groupdocs/groupdocs.redaction'
import java from 'java'
import { SampleFiles } from '#samples'
import { outputPath } from '#output'

const FileType = java.import('com.groupdocs.redaction.FileType')
const LoadOptions = java.import('com.groupdocs.redaction.options.LoadOptions')
const DeleteAnnotationRedaction = java.import('com.groupdocs.redaction.redactions.DeleteAnnotationRedaction')
const ExactPhraseRedaction = java.import('com.groupdocs.redaction.redactions.ExactPhraseRedaction')
const ReplacementOptions = java.import('com.groupdocs.redaction.redactions.ReplacementOptions')
const RasterizationOptions = java.import('com.groupdocs.redaction.options.RasterizationOptions')
const FileInputStream = java.import('java.io.FileInputStream')
const FileOutputStream = java.import('java.io.FileOutputStream')
const Color = java.import('java.awt.Color')

const stream = new FileInputStream(SampleFiles.SAMPLE_DOCX)
try {
  const redactor = new Redactor(stream, new LoadOptions(FileType.getDOCX()))
  try {
    redactor.apply(new DeleteAnnotationRedaction())
    const rasterOptions = new RasterizationOptions()
    rasterOptions.setEnabled(false)
    const outFile = outputPath('load-with-file-type', 'LoadWithFileType_Stream_sample.docx')
    const streamOut = new FileOutputStream(outFile)
    redactor.save(streamOut, rasterOptions)
    streamOut.close()
  } finally {
    redactor.close()
  }
} finally {
  stream.close()
}

const redactor = new Redactor(SampleFiles.LOREMIPSUM_PDF, new LoadOptions(FileType.getPDF()))
try {
  redactor.apply(new ExactPhraseRedaction('Lorem', new ReplacementOptions(Color.BLACK)))
  redactor.save()
} finally {
  redactor.close()
}
process.exit(0)
