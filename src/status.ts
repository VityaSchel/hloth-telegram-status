import bigInt from 'big-integer'
import { Api, TelegramClient } from 'telegram'

export const WORK_STATUS = 1
export const AFK_STATUS = 2
export const SLEEP_STATUS = 3

const EMOJI_DOCUMENT_IDS = {
  work: 5453998602038813466n,
  sleep: 5429156240615810384n,
  afk: 5431438062250892883n
}

export async function changeStatus(client: TelegramClient) {
  const now = new Date()
  const status = determineStatus(now)
  switch(status) {
    case WORK_STATUS:
      console.log('Status changed to "Work"')
      await setEmojiStatus(client, EMOJI_DOCUMENT_IDS.work)
      break
      
    case SLEEP_STATUS:
      console.log('Status changed to "Sleep"')
      await setEmojiStatus(client, EMOJI_DOCUMENT_IDS.sleep)
      break
      
    case AFK_STATUS:
      console.log('Status changed to "AFK"')
      await setEmojiStatus(client, EMOJI_DOCUMENT_IDS.afk)
      break
  }
}

async function setEmojiStatus(client: TelegramClient, documentId: bigint) {
  await client.invoke(
    new Api.account.UpdateEmojiStatus({
      emojiStatus: new Api.EmojiStatus({
        documentId: bigInt(documentId)
      })
    })
  )
}

const SATURDAY = 6
const SUNDAY = 0
const SAMARA_TIMEZONE_OFFSET = 240 // minutes
export function determineStatus(now: Date): typeof WORK_STATUS | typeof AFK_STATUS | typeof SLEEP_STATUS {
  now.setTime(
    now.getTime() 
    + now.getTimezoneOffset()*60*1000 
    + SAMARA_TIMEZONE_OFFSET*60*1000
  )

  const dayOfWeek = now.getDay()
  const isWeekend = dayOfWeek === SATURDAY || dayOfWeek === SUNDAY
  const isWorktime = now.getHours() > 14 && now.getHours() < 22
  if(isWeekend) {
    return AFK_STATUS
  } else if(isWorktime) {
    return WORK_STATUS
  } else {
    return SLEEP_STATUS
  }
}