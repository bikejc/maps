import Head from 'next/head';
import fs from 'fs'
import path from 'path'
import css from 'index.module.scss'

import Map from '../components/Map';

import styles from '../../styles/Home.module.css';

import {useEffect, useState} from "react";

const DEFAULT_CENTER = [40.720, -74.066]
const DEFAULT_ZOOM = 13

function loadFeatures(name) {
    const data = JSON.parse(fs.readFileSync(path.join(process.cwd(), `public/${name}`)))
    const features = data['features']
    return features
}

export async function getStaticProps(context) {
    const wards = loadFeatures('wards.json')
    const bikeLanes = loadFeatures('JC_Bike_Network.json').filter(({ attributes }) => attributes.Type !== 'BIKE LANE')
    const plannedBikeLanes = loadFeatures('JC_Planned_Protected_Bike_Lanes.json')
    const allBikeLanes = bikeLanes.concat(plannedBikeLanes)
    const layers = { wards, bikeLanes: allBikeLanes, }
    return {
        props: { layers }
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

const dataUrls = {
    'roads': 'Roads_Jersey_City.json',
}

export default function Home({ layers, }) {
    let { wards, bikeLanes } = layers
    const { url, attribution } = MAPS['alidade_smooth_dark']
    const title = 'Jersey City Protected Bike Lane & Ward Map'

    const [ activeLayers, setActiveLayers ] = useState([ 'wards', 'bikeLanes', ])

    const [ allLayers, setAllLayers ] = useState(layers)

    const [ showSettings, setShowSettings ] = useState(false)

    const href = (typeof window !== 'undefined') && window.location.href

    useEffect(() => {
        if (!href) return
        const fetchLayer = async (k) => {
            if (k in allLayers) return Promise.resolve()
            const path = dataUrls[k]
            const url = `${href}/${path}`
            console.log(`fetching layer: ${k}`)
            const res = await fetch(url)
            console.log(`fetched layer: ${k}`)
            const json = await res.json()
            const roads = json['features']
            layers['roads'] = roads
            const newLayers = { roads, ...layers }
            setAllLayers(newLayers)
            setActiveLayers([ ...activeLayers, 'roads', ])
            return Promise.resolve()
        }

        Promise.all(activeLayers.map(fetchLayer)).catch(console.error)
    }, [ activeLayers ])

    const wardsLayer = ({ Polygon, Popup }) => wards.map(({ attributes, geometry }) => {
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

    const bikeLanesLayer = ({ Polyline, Popup }) => bikeLanes.map(({ attributes, geometry }) => {
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

    const roadsLayer = ({ Polyline, Popup }) => allLayers['roads']?.map(({ attributes, geometry }) => {
        let { OBJECTID, LocalName: name, DIRECTION: direction, MEASURED_L: length } = attributes
        let title = `${name}: ${length}mi`
        direction = direction.trim()
        if (direction) {
            title = `${title}, ${direction}`
        }
        return geometry.paths.map((positions, idx) => {
            const key = `${name}_${OBJECTID}_${idx}`
            positions = positions.map(([lon, lat]) => [lat, lon])
            return (
                <Polyline color={"red"} key={key} positions={positions}>
                    <Popup>{title}</Popup>
                </Polyline>
            )
        })
    })

    return (
        <div className={styles.container}>
            <Head>
                <title>{title}</title>
                <link rel="icon" href="/maps/favicon.ico" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
            </Head>

            <main className={styles.main}>
                <Map className={styles.homeMap} center={DEFAULT_CENTER} zoom={DEFAULT_ZOOM} zoomControl={false}>
                    {({ TileLayer, Marker, Polygon, Polyline, Popup }) => (
                        <>
                            <TileLayer url={url} attribution={attribution} />
                            {('wards' in allLayers) && activeLayers.includes('wards') && wardsLayer({ Polygon, Popup })}
                            {('bikeLanes' in allLayers) && activeLayers.includes('bikeLanes') && bikeLanesLayer({ Polyline, Popup })}
                            {('roads' in allLayers) && activeLayers.includes('roads') && roadsLayer({ Polyline, Popup })}
                        </>
                    )}
                </Map>
                <div className={styles.title}>
                    Jersey City Protected Bike Lane + Ward Map
                </div>
                <div className={css.gearContainer}>
                    <div className={css.settings}>
                        <i className={`fa fa-gear ${css.gear}`} onClick={() => setShowSettings(!showSettings)} />
                        {showSettings && <div className={css.menu}>
                            <ul className={css.layers}>
                                {
                                    [
                                        { label: "Roads", key: "roads"},
                                        { label: "Bike Lanes", key: "bikeLanes"},
                                        { label: "Wards", key: "wards"},
                                    ].map(({ label, key, }) => {
                                        const active = activeLayers.includes(key)
                                        function onChange(e) {
                                            const checked = e.target.checked
                                            console.log(`${key}:`, e.target, checked)
                                            if (checked === active) {
                                                console.error(`layer ${key}: checked ${checked} != active ${active}`)
                                            }
                                            if (checked) {
                                                setActiveLayers([ ...activeLayers, key ])
                                            } else {
                                                setActiveLayers(activeLayers.filter(k => k !== key))
                                            }
                                        }
                                        return <li key={key}><label><input type={"checkbox"} onChange={onChange} checked={active} />{label}</label></li>
                                    })
                                }
                            </ul>
                        </div>}
                    </div>
                </div>
            </main>
        </div>
    )
}
