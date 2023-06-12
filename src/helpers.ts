export const dateToUnix = (date: Date) => Math.round(date.getTime() / 1000)
export const unixToDate = (unixTimestamp: number) =>
  new Date(unixTimestamp * 1000)

export const convertToUnixTimestamp = (dateString: string): number =>
  Math.floor(new Date(dateString).getTime() / 1000)

export const parseDuration = (duration: string) => parseInt(duration, 10) || 0
