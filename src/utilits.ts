export const humanDate = (dateString: string): string => {
  const date = new Date(dateString)
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()

  const formattedDate = `${day < 10 ? '0' + day : day}.${
    month < 10 ? '0' + month : month
  }.${year}`
  const formattedTime = `${hours < 10 ? '0' + hours : hours}:${
    minutes < 10 ? '0' + minutes : minutes
  }:${seconds < 10 ? '0' + seconds : seconds}`

  return `${formattedDate} ${formattedTime}`
}
