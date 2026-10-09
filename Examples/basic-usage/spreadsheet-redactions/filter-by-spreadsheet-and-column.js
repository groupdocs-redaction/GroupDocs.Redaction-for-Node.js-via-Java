import { Redactor } from '@groupdocs/groupdocs.redaction'
import java from 'java'
import { SampleFiles } from '#samples'
import { outputPath } from '#output'

const CellColumnRedaction = java.import('com.groupdocs.redaction.redactions.CellColumnRedaction')
const CellFilter = java.import('com.groupdocs.redaction.redactions.CellFilter')
const ReplacementOptions = java.import('com.groupdocs.redaction.redactions.ReplacementOptions')
const RasterizationOptions = java.import('com.groupdocs.redaction.options.RasterizationOptions')
const RedactionStatus = java.import('com.groupdocs.redaction.RedactionStatus')
const FileOutputStream = java.import('java.io.FileOutputStream')
const Pattern = java.import('java.util.regex.Pattern')

const redactor = new Redactor(SampleFiles.SAMPLE_XLSX)
try {
  const filter = new CellFilter()
  filter.setColumnIndex(1)
  filter.setWorkSheetName('Customers')
  const expression = Pattern.compile("^\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$")
  const result = redactor.apply(new CellColumnRedaction(filter, expression, new ReplacementOptions('[customer email]')))
  if (result.getStatus() !== RedactionStatus.Failed) {
    const rasterOptions = new RasterizationOptions()
    rasterOptions.setEnabled(false)
    const outFile = outputPath('filter-by-spreadsheet-and-column', 'filter-by-spreadsheet-and-column_sample.xlsx')
    const stream = new FileOutputStream(outFile)
    redactor.save(stream, rasterOptions)
    stream.close()
  }
} finally {
  redactor.close()
}
process.exit(0)
