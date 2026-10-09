import { Redactor } from '@groupdocs/groupdocs.redaction'
import java from 'java'
import { SampleFiles } from '#samples'
import { outputPath } from '#output'

const DeleteAnnotationRedaction = java.import('com.groupdocs.redaction.redactions.DeleteAnnotationRedaction')
const RasterizationOptions = java.import('com.groupdocs.redaction.options.RasterizationOptions')
const FileOutputStream = java.import('java.io.FileOutputStream')

const redactor = new Redactor(SampleFiles.ANNOTATED_XLSX)
try {
  redactor.apply(new DeleteAnnotationRedaction('(?im:john)'))
  const rasterOptions = new RasterizationOptions()
  rasterOptions.setEnabled(false)
  const outFile = outputPath('remove-annotations', 'remove-annotations_sample1.xlsx')
  const stream = new FileOutputStream(outFile)
  redactor.save(stream, rasterOptions)
  stream.close()
} finally {
  redactor.close()
}
process.exit(0)
