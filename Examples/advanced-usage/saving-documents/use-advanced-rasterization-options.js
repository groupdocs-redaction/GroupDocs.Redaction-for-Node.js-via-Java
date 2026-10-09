import { Redactor } from '@groupdocs/groupdocs.redaction'
import java from 'java'
import { SampleFiles } from '#samples'
import { outputPath } from '#output'

const RasterizationOptions = java.import('com.groupdocs.redaction.options.RasterizationOptions')
const AdvancedRasterizationOptions = java.import('com.groupdocs.redaction.options.AdvancedRasterizationOptions')
const FileOutputStream = java.import('java.io.FileOutputStream')

const redactor = new Redactor(SampleFiles.MULTIPAGE_SAMPLE_DOCX)
try {
  const rasterOptions = new RasterizationOptions()
  rasterOptions.setEnabled(true)
  rasterOptions.addAdvancedOption(AdvancedRasterizationOptions.Border)
  rasterOptions.addAdvancedOption(AdvancedRasterizationOptions.Noise)
  rasterOptions.addAdvancedOption(AdvancedRasterizationOptions.Grayscale)
  rasterOptions.addAdvancedOption(AdvancedRasterizationOptions.Tilt)
  const outFile = outputPath('use-advanced-rasterization-options', 'use-advanced-rasterization-options_multipage_sample.pdf')
  const stream = new FileOutputStream(outFile)
  redactor.save(stream, rasterOptions)
  stream.close()
} finally {
  redactor.close()
}
process.exit(0)
