import { Redactor } from '@groupdocs/groupdocs.redaction'
import java from 'java'
import { SampleFiles } from '#samples'
import { outputPath } from '#output'

const ImageAreaRedaction = java.import('com.groupdocs.redaction.redactions.ImageAreaRedaction')
const RegionReplacementOptions = java.import('com.groupdocs.redaction.redactions.RegionReplacementOptions')
const RedactionStatus = java.import('com.groupdocs.redaction.RedactionStatus')
const FileOutputStream = java.import('java.io.FileOutputStream')
const Point = java.import('java.awt.Point')
const Dimension = java.import('java.awt.Dimension')
const Color = java.import('java.awt.Color')

const redactor = new Redactor(SampleFiles.SAMPLE_JPG)
try {
  const samplePoint = new Point(385, 485)
  const sampleSize = new Dimension(1793, 2069)
  const result = redactor.apply(new ImageAreaRedaction(samplePoint, new RegionReplacementOptions(Color.BLUE, sampleSize)))
  if (result.getStatus() !== RedactionStatus.Failed) {
    const outFile = outputPath('redact-image-area', 'redact-image-area_sample.pdf')
    const stream = new FileOutputStream(outFile)
    redactor.save(stream)
    stream.close()
  }
} finally {
  redactor.close()
}
process.exit(0)
