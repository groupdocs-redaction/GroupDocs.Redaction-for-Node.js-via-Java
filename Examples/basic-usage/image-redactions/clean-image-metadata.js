import { Redactor } from '@groupdocs/groupdocs.redaction'
import java from 'java'
import { SampleFiles } from '#samples'
import { outputPath } from '#output'

const EraseMetadataRedaction = java.import('com.groupdocs.redaction.redactions.EraseMetadataRedaction')
const MetadataFilters = java.import('com.groupdocs.redaction.redactions.MetadataFilters')
const RasterizationOptions = java.import('com.groupdocs.redaction.options.RasterizationOptions')
const RedactionStatus = java.import('com.groupdocs.redaction.RedactionStatus')
const FileOutputStream = java.import('java.io.FileOutputStream')

const redactor = new Redactor(SampleFiles.SAMPLE_EXIF_JPG)
try {
  const result = redactor.apply(new EraseMetadataRedaction(MetadataFilters.All))
  if (result.getStatus() !== RedactionStatus.Failed) {
    const rasterOptions = new RasterizationOptions()
    rasterOptions.setEnabled(false)
    const outFile = outputPath('clean-image-metadata', 'clean-image-metadata_exif.jpg')
    const stream = new FileOutputStream(outFile)
    redactor.save(stream, rasterOptions)
    stream.close()
  }
} finally {
  redactor.close()
}
process.exit(0)
