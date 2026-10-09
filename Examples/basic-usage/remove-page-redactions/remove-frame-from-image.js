import { Redactor } from '@groupdocs/groupdocs.redaction'
import java from 'java'
import { SampleFiles } from '#samples'
import { outputPath } from '#output'

const RemovePageRedaction = java.import('com.groupdocs.redaction.redactions.RemovePageRedaction')
const PageSeekOrigin = java.import('com.groupdocs.redaction.redactions.PageSeekOrigin')
const RasterizationOptions = java.import('com.groupdocs.redaction.options.RasterizationOptions')
const FileOutputStream = java.import('java.io.FileOutputStream')

const redactor = new Redactor(SampleFiles.ANIMATED_GIF)
try {
  if (redactor.getDocumentInfo().getPageCount() >= 7) {
    redactor.apply(new RemovePageRedaction(PageSeekOrigin.Begin, 2, 5))
    const rasterOptions = new RasterizationOptions()
    rasterOptions.setEnabled(false)
    const outFile = outputPath('remove-frame-from-image', 'remove-frame-from-image_sample.gif')
    const stream = new FileOutputStream(outFile)
    redactor.save(stream, rasterOptions)
    stream.close()
  }
} finally {
  redactor.close()
}
process.exit(0)
