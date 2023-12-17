
export function formatDate(inputDate, mood = 0) {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false,
    };

    const date = new Date(inputDate);
    //return only date
    if (mood === 0)
        return date.toLocaleDateString(undefined, options).split("at")[0];
    //return only time
    if (mood === 1)
        return date.toLocaleDateString(undefined, options).split("at")[1];
    return date.toLocaleDateString(undefined, options);
};