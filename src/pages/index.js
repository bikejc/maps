import Head from 'next/head';
import fs from 'fs'
import path from 'path'

import Map from '../components/Map';

import styles from '../../styles/Home.module.css';

const DEFAULT_CENTER = [40.720, -74.066]
const DEFAULT_ZOOM = 13

function loadFeatures(name) {
    const data = JSON.parse(fs.readFileSync(path.join(process.cwd(), `public/${name}`)))
    // const res = await fetch(`/${name}`)
    // const data = await res.json()
    const features = data['features']
    return features
}

export async function getStaticProps(context) {
    const wards = loadFeatures('wards.json')
    const bikeLanes = loadFeatures('JC_Bike_Network.json').filter(({ attributes }) => attributes.Type !== 'BIKE LANE')
    const plannedBikeLanes = loadFeatures('JC_Planned_Protected_Bike_Lanes.json')
    const allBikeLanes = bikeLanes.concat(plannedBikeLanes)
    return {
        props: {
            wards,
            bikeLanes: allBikeLanes,
        }
    }
}

const wardInfos = {
    A: { color: '#ff0000', councillor: 'Denise Ridley', },
    B: { color: '#ff8800', councillor: 'Mira Prinz-Arey', },
    C: { color: '#ffff00', councillor: 'Rich Boggiano', },
    D: { color: '#00ff00', councillor: 'Yousef Saleh', },
    E: { color: '#0000ff', councillor: 'James Solomon', },
    F: { color: '#ff00ff', councillor: 'Frank Gilmore', },
}

const bikeLaneTypes = {
    'PROTECTED BIKE LANE': { color: '#26de3b', },
    'PLANNED PROTECTED BIKE LANE': { color: '#b122e0', },
    'SHARED USE LANE': { color: '#FFFF00', },
    'SHARED USE PATH': { color: '#00FFFF', },
}

const MAPS = {
    openstreetmap: {
        url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        attribution: "&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors",
    },
    alidade_smooth_dark: {
        url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
        attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    },
}
export default function Home({ wards, bikeLanes }) {
    const { url, attribution } = MAPS['alidade_smooth_dark']
    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <Map className={styles.homeMap} center={DEFAULT_CENTER} zoom={DEFAULT_ZOOM}>
                    {({ TileLayer, Marker, Polygon, Polyline, Popup }) => (
                        <>
                            <TileLayer url={url} attribution={attribution} />
                            {
                                wards.map(({ attributes, geometry }) => {
                                    const wardId = attributes['NAME']
                                    const ward = wardInfos[wardId]
                                    const color = ward.color
                                    const councillor = ward.councillor
                                    const key = `ward-${wardId}`
                                    return geometry.rings.map(positions => {
                                        positions = positions.map(([lon, lat]) => [lat, lon])
                                        return (
                                            <Polygon weight={1} color={"black"} fillColor={color} key={key}
                                                     positions={positions} fillOpacity={0.2}>
                                                <Popup>
                                                    <span>Ward {wardId}:</span>{' '}
                                                    <span>{councillor}</span>
                                                </Popup>
                                            </Polygon>
                                        )
                                    })
                                })
                            }
                            {
                                bikeLanes.map(({ attributes, geometry }) => {
                                    let { OBJECTID, Street_Name: name, Type, Surface_Treatment: surface, Status: status, } = attributes
                                    name = name || attributes.StreetName
                                    const type = (status == 'PLANNED') ? `PLANNED ${Type}` : Type
                                    if (type !== 'PROTECTED BIKE LANE' && type !== 'PLANNED PROTECTED BIKE LANE') return
                                    const color = bikeLaneTypes[type?.trim()]?.color || 'black'
                                    return geometry.paths.map((positions, idx) => {
                                        positions = positions.map(([lon, lat]) => [lat, lon])
                                        const key = `${OBJECTID}_${idx}`
                                        return (
                                            <Polyline color={color} key={key} positions={positions}>
                                                <Popup>
                                                    {name}, {type}, {surface}
                                                </Popup>
                                            </Polyline>
                                        )
                                    })
                                })
                            }
                        </>
                    )}
                </Map>
                <div className={styles.title}>
                    Jersey City Protected Bike Lane + Ward Map
                </div>
            </main>
        </div>
    )
}
