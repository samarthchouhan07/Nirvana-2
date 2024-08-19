var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
export function calcAndSortListings(listings) {
    var sortedListings = listings
        .map(function (listing) {
        if (listing.reviews.length === 0)
            return __assign(__assign({}, listing), { avgRating: 0 });
        var avgRating = listing.reviews.reduce(function (a, b) {
            return a + b.stars;
        }, 0) / listing.reviews.length;
        return __assign(__assign({}, listing), { avgRating: Number(avgRating.toFixed(2)) });
    })
        .sort(function (a, b) { return b.avgRating - a.avgRating; });
    return sortedListings;
}
