import Autozap from '@/ports/autozap'
import configs from '@/../autozapi.json'
import axios from 'axios'

class WhatsApp {
  private static instance: WhatsApp
  private autozap: Autozap

  private constructor() {
    this.autozap = new Autozap(this.onMessage)
  }

  private async onMessage(instanceId: string, data: any) {
    const [applicationId, sessionId] = instanceId.split('_')

    const application = configs.applications.find(
      (app) => app.applicationId === applicationId
    )

    if (!application) return

    await axios.post(application.callback, {
      sessionId,
      message: data,
    })
  }

  public getQrCode(instanceId: string, type_: 'base64' | 'urlCode') {
    return this.autozap.getQrCode(instanceId, type_)
  }

  public getWhatsAppStatus(instanceId: string) {
    return this.autozap.getWhatsAppStatus(instanceId)
  }

  public getContacts(instanceId: string) {
    return this.autozap.getContacts(instanceId)
  }

  public sendMessage(instanceId: string, to: string, text: string) {
    return this.autozap.sendMessage(instanceId, to, text)
  }

  public sendFileMessage(instanceId: string, to: string, base64: string) {
    return this.autozap.sendFileMessage(instanceId, to, base64)
  }

  public sendAudio(instanceId: string, to: string, base64: string) {
    return this.autozap.sendAudio(instanceId, to, base64)
  }

  public logout(instanceId: string): any {
    return this.autozap.logout(instanceId)
  }

  public static getInstance(): WhatsApp {
    if (!WhatsApp.instance) {
      WhatsApp.instance = new WhatsApp()
    }
    return WhatsApp.instance
  }
}

export default WhatsApp
