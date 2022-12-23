import fs from 'fs'
import WhatsApp from '@/adapters/whatsapp'
import Queue from '@/adapters/queue'

const setup = async (): Promise<void> =>
  new Promise(async (resolve, reject) => {
    try {
      console.log('**** START WHATSAPP SERVICES ****')

      const whatsApp = WhatsApp.getInstance()

      if (!fs.existsSync('.autozap')) {
        fs.mkdirSync('.autozap')
      }

      const instances = fs
        .readdirSync('.autozap', { withFileTypes: true })
        .filter((item) => item.isDirectory())
        .map((folder) => folder.name.replace('SESSION_', ''))

      console.log('> LOAD INSTANCES')
      for (const instanceId of instances) {
        console.log('instance:', instanceId)
        const status = await whatsApp.getWhatsAppStatus(instanceId)
        console.log('status:', status)
        console.log('---')
      }

      console.log('> START MESSAGE QUEUE')
      Queue.getInstance()

      resolve()
    } catch (err) {
      reject(err)
    }
  })

export default setup
