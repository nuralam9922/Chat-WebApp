import date from 'date-and-time'

export const formatTime = (time) => {
    return date.format(new Date(time), 'h:mm A')
}