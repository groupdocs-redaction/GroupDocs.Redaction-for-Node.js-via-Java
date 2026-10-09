import java from 'java'
import '@groupdocs/groupdocs.redaction'
import { SampleFiles } from '#samples'

const RedactionPolicy = java.import('com.groupdocs.redaction.RedactionPolicy')
const ExactPhraseRedaction = java.import('com.groupdocs.redaction.redactions.ExactPhraseRedaction')
const RegexRedaction = java.import('com.groupdocs.redaction.redactions.RegexRedaction')
const DeleteAnnotationRedaction = java.import('com.groupdocs.redaction.redactions.DeleteAnnotationRedaction')
const EraseMetadataRedaction = java.import('com.groupdocs.redaction.redactions.EraseMetadataRedaction')
const MetadataFilters = java.import('com.groupdocs.redaction.redactions.MetadataFilters')
const ReplacementOptions = java.import('com.groupdocs.redaction.redactions.ReplacementOptions')
const Color = java.import('java.awt.Color')

const policy = new RedactionPolicy(java.newArray('com.groupdocs.redaction.Redaction', [
  new ExactPhraseRedaction('Redaction', new ReplacementOptions('[Product]')),
  new RegexRedaction('\\d{2}\\s*\\d{2}[^\\d]*\\d{6}', new ReplacementOptions(Color.BLUE)),
  new DeleteAnnotationRedaction(),
  new EraseMetadataRedaction(MetadataFilters.All)
]))
policy.save(SampleFiles.POLICY_SAVE)
process.exit(0)
