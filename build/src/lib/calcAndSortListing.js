export function calcAndSortListings(listings) {
    const sortedListings = listings
        .map((listing) => {
        if (listing.reviews.length === 0)
            return Object.assign(Object.assign({}, listing), { avgRating: 0 });
        const avgRating = listing.reviews.reduce((a, b) => {
            return a + b.stars;
        }, 0) / listing.reviews.length;
        return Object.assign(Object.assign({}, listing), { avgRating: Number(avgRating.toFixed(2)) });
    })
        .sort((a, b) => b.avgRating - a.avgRating);
    return sortedListings;
}
