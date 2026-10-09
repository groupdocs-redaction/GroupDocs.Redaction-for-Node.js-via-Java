import { Redactor } from '@groupdocs/groupdocs.redaction'
import java from 'java'
import { readdirSync, statSync } from 'fs'
import { join } from 'path'
import { SampleFiles } from '#samples'

const RedactionPolicy = java.import('com.groupdocs.redaction.RedactionPolicy')
const RasterizationOptions = java.import('com.groupdocs.redaction.options.RasterizationOptions')
const RedactionStatus = java.import('com.groupdocs.redaction.RedactionStatus')
const FileOutputStream = java.import('java.io.FileOutputStream')

const policy = RedactionPolicy.load(SampleFiles.POLICY_FILE)
const files = readdirSync(SampleFiles.POLICY_INBOUND)
  .map(name => join(SampleFiles.POLICY_INBOUND, name))
  .filter(path => statSync(path).isFile())

for (const filePath of files) {
  const redactor = new Redactor(filePath)
  try {
    const result = redactor.apply(policy)
    const resultFolder = result.getStatus() !== RedactionStatus.Failed
      ? SampleFiles.POLICY_OUTBOUND_DONE
      : SampleFiles.POLICY_OUTBOUND_FAILED
    const fileName = filePath.split(/[/\\]/).pop()
    const stream = new FileOutputStream(join(resultFolder, fileName))
    const options = new RasterizationOptions()
    options.setEnabled(false)
    redactor.save(stream, options)
    stream.close()
  } finally {
    redactor.close()
  }
}
process.exit(0)
