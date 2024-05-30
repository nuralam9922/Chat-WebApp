import date from 'date-and-time';

export const formatTime = (time) => {
    if (!time) return ''; // Handle null or undefined time
    const parsedDate = new Date(time);
    if (isNaN(parsedDate)) return ''; // Handle invalid date
    return date.format(parsedDate, 'h:mm A');
};
