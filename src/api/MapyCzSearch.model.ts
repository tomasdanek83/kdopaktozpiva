export type MapyCzSearchResultItemUserData = {
    id: string
    latitude: string
    longitude: string
    suggestFirstRow: string
    suggestSecondRow: string
}

export type MapyCzSearchResultItem = {
    category: string
    userData: MapyCzSearchResultItemUserData
}

export type MapyCzSearchResult = {
    result: MapyCzSearchResultItem[]
}
