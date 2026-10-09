import { Redactor } from '@groupdocs/groupdocs.redaction'
import java from 'java'
import { SampleFiles } from '#samples'
import { outputPath } from '#output'

const ExactPhraseRedaction = java.import('com.groupdocs.redaction.redactions.ExactPhraseRedaction')
const ReplacementOptions = java.import('com.groupdocs.redaction.redactions.ReplacementOptions')
const PageRangeFilter = java.import('com.groupdocs.redaction.redactions.PageRangeFilter')
const PageAreaFilter = java.import('com.groupdocs.redaction.redactions.PageAreaFilter')
const PageSeekOrigin = java.import('com.groupdocs.redaction.redactions.PageSeekOrigin')
const RedactionStatus = java.import('com.groupdocs.redaction.RedactionStatus')
const FileOutputStream = java.import('java.io.FileOutputStream')
const Point = java.import('java.awt.Point')
const Dimension = java.import('java.awt.Dimension')

const redactor = new Redactor(SampleFiles.MULTIPAGE_PDF)
try {
  const info = redactor.getDocumentInfo()
  const lastPage = info.getPages().get(info.getPageCount() - 1)
  const options = new ReplacementOptions('[secret]')
  options.setFilters(java.newArray('com.groupdocs.redaction.redactions.RedactionFilter', [
    new PageRangeFilter(PageSeekOrigin.End, 0, 1),
    new PageAreaFilter(new Point(0, Math.floor(lastPage.getHeight() / 2)),
      new Dimension(lastPage.getWidth(), Math.floor(lastPage.getHeight() / 2)))
  ]))
  const result = redactor.apply(new ExactPhraseRedaction('bibliography', false, options))
  if (result.getStatus() !== RedactionStatus.Failed) {
    const outFile = outputPath('use-pdf-redaction-filters', 'use-pdf-redaction-filters_Multipage.pdf')
    const stream = new FileOutputStream(outFile)
    redactor.save(stream)
    stream.close()
  }
} finally {
  redactor.close()
}
process.exit(0)
