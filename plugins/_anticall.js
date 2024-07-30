const { WAMessageStubType } = (await import('@adiwajshing/baileys')).default
import { format } from 'util';

const isNumber = x => typeof x === 'number' && !isNaN(x)
const delay = ms => isNumber(ms) && new Promise(resolve => setTimeout(function () {
    clearTimeout(this)
    resolve()
}, ms))

export async function all(m) {
    if (m.fromMe && m.isBaileys) return !0
    if (m.text) {
        if (m.text === "") return
        this.sendMessage(m.chat, { react: { text: "👍", key: m.key }})
    }

    let text;
    let setting = global.db.data.settings[this.user.jid]
    if(!setting.antiCall) return 

    if (m.messageStubType === (WAMessageStubType.CALL_MISSED_VOICE || WAMessageStubType.CALL_MISSED_VIDEO)) {
        await this.reply(m.chat, 'kamu Di blockir oleh bot karena telah melanggar aturan bot\n\n*ðŸ“®Dilarang menelepon Bot!*', null)
        await delay(1000)
        await this.updateBlockStatus(m.chat, "block")
    }
}
