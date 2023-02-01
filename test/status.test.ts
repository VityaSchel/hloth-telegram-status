import { determineStatus } from '../src/status'
import { WORK_STATUS, SLEEP_STATUS, AFK_STATUS } from '../src/status'

test('determines WORK status correctly', () => {
  expect(determineStatus(new Date('2023-02-01 19:58:00 GMT+4'))).toBe(WORK_STATUS)
})

test('determines SLEEP status correctly', () => {
  expect(determineStatus(new Date('2023-02-01 22:58:00 GMT+4'))).toBe(SLEEP_STATUS)
  expect(determineStatus(new Date('2023-02-01 00:00:00 GMT+4'))).toBe(SLEEP_STATUS)
})

test('works with timezone offset', () => {
  expect(determineStatus(new Date('2023-02-01 11:00:00 GMT+0'))).toBe(WORK_STATUS)
})

test('determines AFK status correctly', () => {
  expect(determineStatus(new Date('2023-02-04 12:30:00 GMT+4'))).toBe(AFK_STATUS)
  expect(determineStatus(new Date('2023-02-05 12:30:00 GMT+4'))).toBe(AFK_STATUS)
  expect(determineStatus(new Date('2023-02-06 12:30:00 GMT+4'))).toBe(WORK_STATUS)
})