import { Redactor } from '@groupdocs/groupdocs.redaction'
import java from 'java'
import { SampleFiles } from '#samples'
import { outputPath } from '#output'

const ImageAreaRedaction = java.import('com.groupdocs.redaction.redactions.ImageAreaRedaction')
const RegionReplacementOptions = java.import('com.groupdocs.redaction.redactions.RegionReplacementOptions')
const RasterizationOptions = java.import('com.groupdocs.redaction.options.RasterizationOptions')
const RedactionStatus = java.import('com.groupdocs.redaction.RedactionStatus')
const FileOutputStream = java.import('java.io.FileOutputStream')
const Point = java.import('java.awt.Point')
const Dimension = java.import('java.awt.Dimension')
const Color = java.import('java.awt.Color')

const redactor = new Redactor(SampleFiles.SAMPLE_DOCX)
try {
  const samplePoint = new Point(516, 311)
  const sampleSize = new Dimension(170, 35)
  const result = redactor.apply(new ImageAreaRedaction(samplePoint, new RegionReplacementOptions(Color.BLUE, sampleSize)))
  if (result.getStatus() !== RedactionStatus.Failed) {
    const rasterOptions = new RasterizationOptions()
    rasterOptions.setEnabled(false)
    const outFile = outputPath('redact-embedded-images', 'redact-embedded-images_sample.docx')
    const stream = new FileOutputStream(outFile)
    redactor.save(stream, rasterOptions)
    stream.close()
  }
} finally {
  redactor.close()
}
process.exit(0)
