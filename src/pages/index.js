import Head from 'next/head';
import fs from 'fs'
import path from 'path'
import css from './index.module.scss'

import Map from '../components/Map';

import styles from '../../styles/Home.module.css';

import {useEffect, useState} from "react";

const DEFAULT_CENTER = [40.720, -74.066]
const DEFAULT_ZOOM = 13

function loadFeatures(name) {
    const data = JSON.parse(fs.readFileSync(path.join(process.cwd(), `public/${name}`)))
    return data['features']
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

const layerOrder = [ 'wards', 'bikeLanes', 'roads', ]

function MapLayer({ TileLayer, Polygon, Polyline, ZoomControl, Popup, Tooltip, activeLayerIndices, fetchedLayers, activeLayers, }) {
    const wardsLayer = () => {
        const rank = activeLayerIndices['wards']
        return (
            fetchedLayers['wards'].map(({attributes, geometry}) => {
                const wardId = attributes['NAME']
                const ward = wardInfos[wardId]
                const color = ward.color
                const councillor = ward.councillor
                const key = `ward-${wardId}_rank${rank}`
                return (
                    geometry.rings.map(positions => {
                        positions = positions.map(([lon, lat]) => [lat, lon])
                        return (
                            <Polygon style={{zIndex: 1}} weight={1} color={"black"} fillColor={color} key={key}
                                     positions={positions} fillOpacity={0.2}>
                                <Popup>
                                    <span>Ward {wardId}:</span>{' '}
                                    <span>{councillor}</span>
                                </Popup>
                            </Polygon>
                        )
                    })
                )
            })
        )
    }

    const bikeLanesLayer = () => {
        const rank = activeLayerIndices['bikeLanes']
        return (
            fetchedLayers['bikeLanes'].map(({ attributes, geometry }) => {
                let { OBJECTID, Street_Name: name, Type, Surface_Treatment: surface, Status: status, } = attributes
                name = name || attributes.StreetName
                const type = (status === 'PLANNED') ? `PLANNED ${Type}` : Type
                if (type !== 'PROTECTED BIKE LANE' && type !== 'PLANNED PROTECTED BIKE LANE') return
                const color = bikeLaneTypes[type?.trim()]?.color || 'black'
                return (
                    geometry.paths.map((positions, idx) => {
                        positions = positions.map(([lon, lat]) => [lat, lon])
                        const key = `${OBJECTID}_${idx}_rank${rank}`
                        return (
                            <Polyline color={color} key={key} positions={positions}>
                                <Popup>
                                    {name}, {type}, {surface}
                                </Popup>
                            </Polyline>
                        )
                    })
                )
            })
        )
    }

    const roadsLayer = () => {
        const rank = activeLayerIndices['roads']
        return (
            fetchedLayers['roads']?.map(({attributes, geometry}) => {
                let {OBJECTID, LocalName: name, DIRECTION: direction, MEASURED_L: length} = attributes
                let title = `${name}: ${length}mi`
                direction = direction.trim()
                if (direction) {
                    title = `${title}, ${direction}`
                }
                return geometry.paths.map((positions, idx) => {
                    const key = `${name}_${OBJECTID}_${idx}_rank${rank}`
                    positions = positions.map(([lon, lat]) => [lat, lon])
                    return (
                        <Polyline color={"red"} key={key} positions={positions}>
                            <Popup>{title}</Popup>
                        </Polyline>
                    )
                })
            })
        )
    }

    const { url, attribution } = MAPS['alidade_smooth_dark']

    return (
        <>
            <TileLayer url={url} attribution={attribution}/>
            {('wards' in fetchedLayers) && activeLayers.includes('wards') && wardsLayer()}
            {('bikeLanes' in fetchedLayers) && activeLayers.includes('bikeLanes') && bikeLanesLayer()}
            {('roads' in fetchedLayers) && activeLayers.includes('roads') && roadsLayer()}
            <ZoomControl position="bottomleft" />
        </>
    )
}

export default function Home({ layers, }) {
    const title = 'Jersey City Protected Bike Lane & Ward Map'

    const [ rawActiveLayers, setActiveLayers ] = useState([ 'wards', 'bikeLanes', ])
    let activeLayers = rawActiveLayers.map(k => [ layerOrder.indexOf(k), k ]).sort(([ l ], [ r ]) => l - r).map(([ _, k ]) => k)
    const activeLayerIndices = Object.fromEntries(activeLayers.map((k, idx) => [ k, idx ]))

    console.log("active:", activeLayers, "raw:", rawActiveLayers)

    const [ fetchedLayers, setFetchedLayers ] = useState(layers)

    const [ showSettings, setShowSettings ] = useState(false)
    const [ hoverSettings, setHoverSettings ] = useState(false)

    const href = (typeof window !== 'undefined') && window.location.href

    useEffect(() => {
        if (!href) return
        const fetchLayer = async (k) => {
            if (k in fetchedLayers) return Promise.resolve()
            const path = dataUrls[k]
            const url = `${href}/${path}`
            console.log(`fetching layer: ${k}`)
            const res = await fetch(url)
            console.log(`fetched layer: ${k}`)
            const json = await res.json()
            const features = json['features']
            layers[k] = features
            const newLayers = { ...layers }
            newLayers[k] = features
            setFetchedLayers(newLayers)
            setActiveLayers([ ...activeLayers, k, ])
            return Promise.resolve()
        }

        Promise.all(activeLayers.map(fetchLayer)).catch(console.error)
    }, [ activeLayers ])

    return (
        <div className={styles.container}>
            <Head>
                <title>{title}</title>
                <link rel="icon" href="/maps/favicon.ico" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
            </Head>

            <main className={styles.main}>{
                (typeof window !== undefined) && <>
                <Map className={styles.homeMap} center={DEFAULT_CENTER} zoom={DEFAULT_ZOOM} zoomControl={false}>
                    { props => MapLayer({ ...props, activeLayerIndices, fetchedLayers, activeLayers, }) }
                </Map>
                <div className={styles.title}>
                    Jersey City Protected Bike Lane + Ward Map
                </div>
                <div className={css.gearContainer} onMouseEnter={() => setHoverSettings(true)} onMouseLeave={() => setHoverSettings(false)}>
                    <div className={css.settings}>
                        <i className={`fa fa-gear ${css.gear}`} onClick={() => setShowSettings(!showSettings)} />
                        {(showSettings || hoverSettings) && <div className={css.menu}>
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
                </>}
            </main>
        </div>
    )
}
