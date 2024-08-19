export const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const dateinMilliseconds = new Date(start.getTime());
    const dates = [];
    while (dateinMilliseconds <= end) {
        dates.push(new Date(dateinMilliseconds).getTime());
        dateinMilliseconds.setDate(dateinMilliseconds.getDate() + 1);
    }
    return dates;
};
