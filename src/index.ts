import './env.js'
import { TelegramClient } from 'telegram'
import { StringSession } from 'telegram/sessions/index.js'
import input from 'input'
import { changeStatus } from './status.js'
import fs from 'fs/promises'

const __dirname = new URL('.', import.meta.url).pathname
const sessionDataFilePath = __dirname + '../.telegram_session'

export default async function main() {
  const apiId = process.env.API_ID
  const apiHash = process.env.API_HASH as string
  const session = new StringSession(
    await new Promise(resolve => {
      fs.stat(sessionDataFilePath)
        .catch(() => resolve(''))
        .then(() => fs.readFile(sessionDataFilePath, 'utf-8').then(resolve))
    })
  )

  const client = new TelegramClient(session, Number(apiId), apiHash, {
    connectionRetries: 5,
    deviceModel: 'Emoji status bot'
  })

  await client.start(
    process.argv.includes('--interactive')
      ? INTERACTIVE_CLIENT
      : AUTOMATED_CLIENT
  )
  console.log('Logged in as hloth')
  
  await fs.writeFile(sessionDataFilePath, client.session.save() as unknown as string, 'utf-8')

  await changeStatus(client)
  await client.disconnect()
  process.exit(0)
}

const INTERACTIVE_CLIENT = {
  phoneNumber: async () => await input.text('Please enter your number: '),
  password: async () => await input.text('Please enter your password: '),
  phoneCode: async () =>
    await input.text('Please enter the code you received: '),
  onError: (err) => console.log(err),
}

const loginCallback = async () => { console.error('Not logged in!'); process.exit(1) }
const AUTOMATED_CLIENT = {
  phoneNumber: loginCallback,
  password: loginCallback,
  phoneCode: loginCallback,
  onError: (err) => console.log(err),
}

await main()