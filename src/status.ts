export const WORK_STATUS = 1
export const AFK_STATUS = 2
export const SLEEP_STATUS = 3

export function changeStatus() {
  const now = new Date()
  console.log(determineStatus(now))
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