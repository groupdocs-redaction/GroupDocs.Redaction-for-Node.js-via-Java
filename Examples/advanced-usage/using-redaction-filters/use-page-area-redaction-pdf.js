import { Redactor } from '@groupdocs/groupdocs.redaction'
import java from 'java'
import { SampleFiles } from '#samples'
import { outputPath } from '#output'

const PageAreaRedaction = java.import('com.groupdocs.redaction.redactions.PageAreaRedaction')
const ReplacementOptions = java.import('com.groupdocs.redaction.redactions.ReplacementOptions')
const RegionReplacementOptions = java.import('com.groupdocs.redaction.redactions.RegionReplacementOptions')
const PageRangeFilter = java.import('com.groupdocs.redaction.redactions.PageRangeFilter')
const PageAreaFilter = java.import('com.groupdocs.redaction.redactions.PageAreaFilter')
const PageSeekOrigin = java.import('com.groupdocs.redaction.redactions.PageSeekOrigin')
const RedactionStatus = java.import('com.groupdocs.redaction.RedactionStatus')
const FileOutputStream = java.import('java.io.FileOutputStream')
const Pattern = java.import('java.util.regex.Pattern')
const Point = java.import('java.awt.Point')
const Dimension = java.import('java.awt.Dimension')
const Color = java.import('java.awt.Color')

const redactor = new Redactor(SampleFiles.LOREMIPSUM_PDF)
try {
  const rx = Pattern.compile('urna')
  const optionsText = new ReplacementOptions('[redarea]')
  optionsText.setFilters(java.newArray('com.groupdocs.redaction.redactions.RedactionFilter', [
    new PageRangeFilter(PageSeekOrigin.End, 0, 1),
    new PageAreaFilter(new Point(300, 0), new Dimension(300, 840))
  ]))
  const optionsImg = new RegionReplacementOptions(Color.RED, new Dimension(100, 100))
  const result = redactor.apply(new PageAreaRedaction(rx, optionsText, optionsImg))
  if (result.getStatus() !== RedactionStatus.Failed) {
    const outFile = outputPath('use-page-area-redaction-pdf', 'use-page-area-redaction-pdf_LoremIpsum.pdf')
    const stream = new FileOutputStream(outFile)
    redactor.save(stream)
    stream.close()
  }
} finally {
  redactor.close()
}
process.exit(0)
