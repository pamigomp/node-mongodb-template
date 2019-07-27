'use strict';

module.exports = {
    caseInsensitiveSorting(arr, field) {
        if (arr) {
            if (field) {
                return arr.sort((l, r) => l[field].toLowerCase().localeCompare(r[field].toLowerCase()));
            }
            return arr.sort((l, r) => l.toLowerCase().localeCompare(r.toLowerCase()));
        }
        return [];
    },
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },
    hasDuplicates(array) {
        return (new Set(array)).size !== array.length;
    }
};
