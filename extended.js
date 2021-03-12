/**
 * @returns true if object have no keys or string length === 0
 */
Object.defineProperty(Object.prototype,
    "IsEmpty",
    {
        get: function IsEmpty() {
            switch (typeof this)
            {
                case "string":
                    return this.length === 0;
                case "object":
                    return Object.keys(this).length === 0;
                default:
                    return false;
            }
        }
    });

/**
 * @returns {string} value with first symbol in Upper Case;
 */
String.prototype.toUCFirst = function () {
    return this.charAt(0).toUpperCase() + this.substr(1).toLowerCase();
};

/**
 * using: String.IsNullOrEmpty(needle: string);
 * @param {string} value - string for checking;
 * @returns {boolean} true if string is null or empty, false if is not;
 */
String.IsNullOrEmpty = (value) => value === null || value.IsEmpty;

/**
 * @returns empty string. More useful because excluded typos like "'"
 */
String.Empty = "";

/**
 * @param {number} fractionDigits: how much digits after dot we need to have;
 * @returns {number} with fractionDigits count after dot;
 */
Number.prototype.toFixedNum = function (fractionDigits) {
    return Number(this.toFixed(fractionDigits));
};

/**
 * Used format types:
 *  Y - full year
 *  m - month number with leading zero (01-12)
 *  d - day number (1-31)
 *  H - hours in 24-format
 *  i - minutes (0-59)
 *  s - seconds (0-59)
 * @param {string} formatString - for return formatted date and/or time
 * @returns {string} formatted date string (d.format("Y-m-d H:i:s") returns "2021-03-12 13:20:31)
 */
Date.prototype.format = function (formatString) {
    let formatTypes = {
        Y: this.getFullYear(),
        m: (this.getMonth() + 1 > 9) ? this.getMonth() + 1 : "0" + (this.getMonth() + 1),
        d: this.getDate(),
        H: this.getHours(),
        i: this.getMinutes(),
        s: this.getSeconds()
    };

    let dateParts = formatString.split("");
    let formattedDate = dateParts.map(function (symbol) {
        if (symbol !== null && symbol !== undefined && formatTypes.hasOwnProperty(symbol))
            return formatTypes[symbol];
        else
            return symbol;
    });

    return formattedDate.join("");
}

/**
 * @param {[number]} dates - days of week that we need to check;
 * @returns {boolean} true if current date day of week in array of dates
 */
Date.prototype.IsDay = function (dates = [1, 2, 3, 4, 5, 6, 7]) {
    let processedDates = [];
    dates.forEach(function (el) {
        if (el <= 7 && el >= 0) processedDates.push(el);
    });

    if (processedDates.indexOf(7) !== -1)
        processedDates.splice(processedDates.indexOf(7), 1, 0);

    return processedDates.indexOf(this.getDay()) !== -1;
}

/**
 * @param {string} timeFrom in format "00:00:00" or "00:00" or "00"
 * @param {string} timeTo in format "00:00:00" or "00:00" or "00"
 *
 * When timeFrom and timeTo used with only hours, or hours and minutes
 * missing seconds and minutes will be complimented by "00"
 *
 * @returns {boolean} true if current date time more than timeFrom and less than timeTo;
 *
 * P.S.: every time will be returns false if timeTo will be less than timeFrom;
 */
Date.prototype.IsInTime = function (timeFrom = "00:00:00", timeTo = "23:59:59") {
    let from = timeFrom.split(":");
    let to = timeTo.split(":");

    if (from.length < 3)
        for (let i = from.length; i < 3; i++)
            from.push("00");

    if (to.length < 3)
        for (let i = to.length; i < 3; i++)
            from.push("00");

    let dateFrom = new Date(this.getFullYear(), this.getMonth(), this.getDate(), Number(from[0]), Number(from[1]), Number(from[2]));
    let dateTo = new Date(this.getFullYear(), this.getMonth(), this.getDate(), Number(to[0]), Number(to[1]), Number(to[2]));

    return this >= dateFrom && this <= dateTo;
}