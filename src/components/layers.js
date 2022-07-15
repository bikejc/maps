
export const wardInfos = {
    A: { color: '#ff0000', councillor: 'Denise Ridley', },
    B: { color: '#ff8800', councillor: 'Mira Prinz-Arey', },
    C: { color: '#ffff00', councillor: 'Rich Boggiano', },
    D: { color: '#00ff00', councillor: 'Yousef Saleh', },
    E: { color: '#0000ff', councillor: 'James Solomon', },
    F: { color: '#ff00ff', councillor: 'Frank Gilmore', },
}

export const bikeLaneTypes = {
    'PROTECTED BIKE LANE': { color: '#26de3b', },
    'PLANNED PROTECTED BIKE LANE': { color: '#b122e0', },
    'SHARED USE LANE': { color: '#FFFF00', },
    'SHARED USE PATH': { color: '#00FFFF', },
}

export const MAPS = {
    openstreetmap: {
        url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        attribution: "&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors",
    },
    alidade_smooth_dark: {
        url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
        attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    },
}

export const dataUrls = {
    'wards': 'wards.json',
    'roads': 'Roads_Jersey_City.json',
    'lur': 'light-up-route-20220708.gpx',
    'citibike': 'JC_Citi_Bike_Locations.json',
    'HIN': 'Vision_Zero_Traffic_Calming_Projects_WFL1/Merged_HIN.json',
    //'counties': 'County_Boundaries_of_NJ.geojson',
    'counties': 'County_Boundaries_of_NJ.geojson',
    'county2': 'County_Boundaries_of_NJ_2x.geojson',
    'county5': 'County_Boundaries_of_NJ_5x.geojson',
    'county10': 'County_Boundaries_of_NJ_10x.geojson',
}

export const layerInfos = [
    { label: "Bike Lanes", key: "bikeLanes", },
    { label: "Roads", key: "roads", },
    { label: "Wards", key: "wards", },
    { label: "Citi Bike Docks", key: "citibike", },
    { label: "High Injury Network", key: "HIN", },
    { label: "Counties", key: "counties", },
    { label: "Counties/2", key: "county2", },
    { label: "Counties/5", key: "county5", },
    { label: "Counties/10", key: "county10", },
    // { label: "Light-Up Ride 7/8/22", key: "lur"},
]

export const layerOrder = [ 'wards', 'counties', 'county2', 'county5', 'county10', 'roads', 'HIN', 'bikeLanes', 'citibike', ]
