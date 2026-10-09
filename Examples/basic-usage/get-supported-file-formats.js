import java from 'java'
import '@groupdocs/groupdocs.redaction'

const FileType = java.import('com.groupdocs.redaction.FileType')

const supported = FileType.getSupportedFileTypes()
const iterator = supported.iterator()
while (iterator.hasNext()) {
  console.log(String(iterator.next()))
}
process.exit(0)
