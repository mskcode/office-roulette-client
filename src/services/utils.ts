import moment, { Moment } from 'moment'

export const parseIso8601Timestamp = (timestamp?: string): Moment | undefined => {
  return timestamp ? moment(timestamp, false) : undefined
}

export const formatMoment = (m?: Moment): string | undefined => {
  return m ? m.format('D.M.YYYY HH:mm') : undefined
}

export const reformatIso8601Timestamp = (timestamp?: string): string | undefined => {
  return formatMoment(parseIso8601Timestamp(timestamp))
}
