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

String.prototype.toUCFirst = function () {
    return this.charAt(0).toUpperCase() + this.substr(1).toLowerCase();
};

String.IsNullOrEmpty = (value) => value === null || value.IsEmpty;

String.Empty = "";

Number.prototype.toFixedNum = function (fractionDigits) {
    return Number(this.toFixed(fractionDigits));
};

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