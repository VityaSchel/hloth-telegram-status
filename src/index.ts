import './env.js'
import { TelegramClient } from 'telegram'
import { StoreSession } from 'telegram/sessions/index.js'
import input from 'input'
import { changeStatus } from './status.js'

export default async function main() {
  const apiId = process.env.API_ID
  const apiHash = process.env.API_HASH as string
  const storeSession = new StoreSession('.telegram_session')

  const client = new TelegramClient(storeSession, Number(apiId), apiHash, {
    connectionRetries: 5,
  })

  await client.start(
    process.argv.includes('--interactive')
      ? INTERACTIVE_CLIENT
      : AUTOMATED_CLIENT
  )
  console.log('Logged in as hloth')

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