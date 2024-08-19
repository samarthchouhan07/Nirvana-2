export var getDatesInRange = function (startDate, endDate) {
    var start = new Date(startDate);
    var end = new Date(endDate);
    var dateinMilliseconds = new Date(start.getTime());
    var dates = [];
    while (dateinMilliseconds <= end) {
        dates.push(new Date(dateinMilliseconds).getTime());
        dateinMilliseconds.setDate(dateinMilliseconds.getDate() + 1);
    }
    return dates;
};
