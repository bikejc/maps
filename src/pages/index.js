import Head from 'next/head';
import fs from 'fs'
import path from 'path'

import Map from '../components/Map';

import styles from '../../styles/Home.module.css';

const DEFAULT_CENTER = [40.724850973063994, -74.06598637239053]
const DEFAULT_ZOOM = 12

function loadFeatures(name) {
    const data = JSON.parse(fs.readFileSync(path.join(process.cwd(), `public/${name}`)))
    const features = data['features']/*.map(({attributes, geometry}) => {
        const keys = Object.keys(geometry)
        if (keys.length > 1) {
            console.error(`${keys.length} keys:`, attributes)
        }
        const [key] = keys
        const geometries = geometry[key]
        if (geometries.length > 1) {
            console.error(`${geometries.length} geometries:`, attributes)
        }
        const [shape] = geometries
        const positions = shape.map(([lon, lat]) => [lat, lon])
        return {attributes, positions}
    })*/
    return features
}

export async function getServerSideProps(context) {
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
    A: {
        councillor: 'Denise Ridley',
        color: '#ff0000',
    },
    B: {
        councillor: 'Mira Prinz-Arey',
        color: '#ff8800',
    },
    C: {
        councillor: 'Rich Boggiano',
        color: '#ffff00',
    },
    D: {
        councillor: 'Yousef Saleh',
        color: '#00ff00',
    },
    E: {
        councillor: 'James Solomon',
        color: '#0000ff',
    },
    F: {
        councillor: 'Frank Gilmore',
        color: '#ff00ff',
    },
}

const bikeLaneTypes = {
    'PROTECTED BIKE LANE': {
        color: '#26de3b',
    },
    'PLANNED PROTECTED BIKE LANE': {
        color: '#b122e0',
    },
    'SHARED USE LANE': {
        color: '#FFFF00',
    },
    'SHARED USE PATH': {
        color: '#00FFFF',
    },
}
export default function Home({ wards, bikeLanes }) {
    console.log(bikeLanes)
    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <div className={styles.title}>
                    Jersey City Bike Lane + Ward Map
                </div>

                <Map className={styles.homeMap} center={DEFAULT_CENTER} zoom={DEFAULT_ZOOM}>
                    {({ TileLayer, Marker, Polygon, Polyline, Popup }) => (
                        <>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                            />
                            {
                                wards.map(({ attributes, geometry }) => {
                                    const wardId = attributes['WARD2']
                                    const ward = wardInfos[wardId]
                                    const color = ward.color
                                    const councillor = ward.councillor
                                    const key = `ward-${wardId}`
                                    return geometry.rings.map(positions => {
                                        positions = positions.map(([lon, lat]) => [lat, lon])
                                        return (
                                            <Polygon weight={1} color={"black"} fillColor={color} key={key}
                                                     positions={positions} fillOpacity={0.1}>
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
                                    if (color == 'black') {
                                        console.log(attributes)
                                    }
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
            </main>
        </div>
    )
}
