

// string to date
export const stringToDate = (date: string) => {
  const newDate = new Date(date)
  const day = newDate.getDate()
  const month = newDate.getMonth() + 1
  const year = newDate.getFullYear()
  return `${day}/${month}/${year}`
}

export const dateFilter = (param:string) => {
  // from Fri Nov 01 2024 00:00:00 GMT+0700 (Western Indonesia Time) to 28-10-2024
  const newDate = new Date(param)
  const day = newDate.getDate()
  const month = newDate.getMonth() + 1
  const year = newDate.getFullYear()
  return `${day}-${month}-${year}`
}

export const timeFormater = (param:string) => {
  const newDate = new Date(param)
  const hours = newDate.getHours()
  const minutes = newDate.getMinutes()

  // two digit minutes and hours
  if (hours < 10 && minutes < 10) {
    return `0${hours}:0${minutes}`
  }

  if (hours < 10) {
    return `0${hours}:${minutes}`
  }

  if (minutes < 10) {
    return `${hours}:0${minutes}`
  }

  return `${hours}:${minutes}`
}