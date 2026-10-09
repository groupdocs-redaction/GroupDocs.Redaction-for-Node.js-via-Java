import java from 'java'

const Metered = java.import('com.groupdocs.redaction.licensing.Metered')

// Replace with your public and private keys.
const publicKey = '****'
const privateKey = '****'

const metered = new Metered()
metered.setMeteredKey(publicKey, privateKey)
console.log('Metered license keys were set (replace placeholders before production use).')
process.exit(0)
