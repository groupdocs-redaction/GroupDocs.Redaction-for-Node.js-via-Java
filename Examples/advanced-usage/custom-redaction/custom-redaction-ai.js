import { Redactor } from '@groupdocs/groupdocs.redaction'
import java from 'java'
import { SampleFiles } from '#samples'

const PageAreaRedaction = java.import('com.groupdocs.redaction.redactions.PageAreaRedaction')
const ReplacementOptions = java.import('com.groupdocs.redaction.redactions.ReplacementOptions')
const CustomRedactionResult = java.import('com.groupdocs.redaction.redactions.CustomRedactionResult')
const SaveOptions = java.import('com.groupdocs.redaction.options.SaveOptions')
const RedactionStatus = java.import('com.groupdocs.redaction.RedactionStatus')
const Pattern = java.import('java.util.regex.Pattern')

const handler = java.newProxy('com.groupdocs.redaction.redactions.ICustomRedactionHandler', {
  redact: (_context) => {
    const result = new CustomRedactionResult()
    try {
      // Insert your AI integration code here.
    } catch (e) {
      result.setApply(false)
    }
    return result
  }
})

const optionsText = new ReplacementOptions('[replaced]')
optionsText.setCustomRedaction(handler)
const textRedaction = new PageAreaRedaction(Pattern.compile('.*'), optionsText)
const redactions = java.newArray('com.groupdocs.redaction.Redaction', [textRedaction])

const redactor = new Redactor(SampleFiles.LOREMIPSUM_PDF)
try {
  const result = redactor.apply(redactions)
  if (result.getStatus() !== RedactionStatus.Failed) {
    redactor.save(new SaveOptions(false, 'Custom_AI_Redaction_Result'))
  } else {
    console.log('Custom AI redaction failed')
  }
} finally {
  redactor.close()
}
process.exit(0)
