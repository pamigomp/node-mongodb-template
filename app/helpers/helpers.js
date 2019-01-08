'use strict';

module.exports = {
    caseInsensitiveSorting(arr, field) {
        if (arr) {
            if (field) {
                return arr.sort((l, r) => l[field].toLowerCase().localeCompare(r[field].toLowerCase()));
            } else {
                return arr.sort((l, r) => l.toLowerCase().localeCompare(r.toLowerCase()));
            }
        } else {
            return [];
        }
    },
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
};
