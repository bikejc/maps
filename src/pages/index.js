import Head from 'next/head';
import fs from 'fs'
import path from 'path'
import css from './index.module.scss'
import { XMLParser } from 'fast-xml-parser'

import Map from '../components/Map';

import styles from '../../styles/Home.module.css';

import {useEffect, useMemo, useReducer, useState} from "react";
import {bikeLaneTypes, bmpLaneTypes, dataUrls, allLayerInfos, layerOrder, MAPS, wardInfos} from "../components/layers";
import {enumMultiParam, floatParam, llParam, parseQueryParams, pathnameRegex} from "../utils/params";

const DEFAULT_CENTER = { lat: 40.720, lng: -74.066, }
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

function MapLayer({ useMapEvents, TileLayer, Marker, Circle, Polygon, Polyline, ZoomControl, Popup, Tooltip, activeLayerIndices, fetchedLayers, activeLayers, setLL, setZoom, }) {
    const map = useMapEvents({
        move: () => setLL(map.getCenter(), 'replaceIn'),
        zoom: () => setZoom(map.getZoom(), 'replaceIn'),
    })

    const wardsLayer = () => {
        const rank = activeLayerIndices['wards']
        return (
            fetchedLayers['wards']?.map(({attributes, geometry}) => {
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
                                <Tooltip sticky={true}>
                                    <span>Ward {wardId}:</span>{' '}
                                    <span>{councillor}</span>
                                </Tooltip>
                            </Polygon>
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
                            <Tooltip sticky={true}>{title}</Tooltip>
                        </Polyline>
                    )
                })
            })
        )
    }

    const lurLayer = () => {
        const positions = fetchedLayers['lur']
        return positions && <Polyline color={"red"} key={"lur"} positions={positions} />
    }

    const citibikeLayer = () => {
        const rank = activeLayerIndices['citibike']
        return (
            fetchedLayers['citibike']?.map(({ attributes, geometry }) => {
                let { OBJECTID, Location: name, StationID, } = attributes
                const position = [ geometry.y, geometry.x ]
                const key = `${OBJECTID}_rank${rank}`
                return (
                    <Circle key={key} center={position} color={"orange"} radius={15}>
                        <Tooltip sticky={true}>
                            {name} ({StationID})
                        </Tooltip>
                    </Circle>
                )
            })
        )
    }

    const hinLayer = () => {
        const rank = activeLayerIndices['HIN']
        return (
            fetchedLayers['HIN']?.map(({ geometry }) => {
                return geometry.paths.map((path, idx) => {
                    return (
                        <Polyline key={`HIN_${idx}_rank${rank}`} positions={path.map(([ lon, lat ]) => [ lat, lon ])} color={"orange"} />
                    )
                })
            })
        )
    }

    const bikeLanesLayer = () => {
        const rank = activeLayerIndices['bikeLanes']
        return (
            fetchedLayers['bikeLanes']?.map(({ attributes, geometry }) => {
                let { OBJECTID, Street_Name: name, Type, Status: status, } = attributes
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
                                <Tooltip sticky={true}>
                                    {name}, {type}
                                </Tooltip>
                            </Polyline>
                        )
                    })
                )
            })
        )
    }

    const bmpLayer = () => {
        const rank = activeLayerIndices['bmp']
        return (
            fetchedLayers['bmp']?.map(({ properties, geometry }, idx) => {
                let { Street, Type, Direction, Lane_count } = properties
                const color = bmpLaneTypes[Type?.trim()]?.color || 'black'
                if (geometry.type !== 'LineString') {
                    console.warn(`Street ${Street}, geometry type ${geometry.type}`)
                    return
                }
                const positions = geometry.coordinates.map(([lon, lat]) => [lat, lon])
                const key = `${Street}_${idx}_rank${rank}`
                return (
                    <Polyline color={color} key={key} positions={positions}>
                        <Tooltip sticky={true}>
                            {Street} ({Type}, {Direction}/b{Lane_count && `, ${Lane_count} lanes`})
                        </Tooltip>
                    </Polyline>
                )
            })
        )
    }

    const { url, attribution } = MAPS['alidade_smooth_dark']

    return (
        <>
            <TileLayer url={url} attribution={attribution}/>
            {('wards' in fetchedLayers) && activeLayers.includes('wards') && wardsLayer()}
            {('roads' in fetchedLayers) && activeLayers.includes('roads') && roadsLayer()}
            {('bikeLanes' in fetchedLayers) && activeLayers.includes('bikeLanes') && bikeLanesLayer()}
            {('citibike' in fetchedLayers) && activeLayers.includes('citibike') && citibikeLayer()}
            {('bmp' in fetchedLayers) && activeLayers.includes('bmp') && bmpLayer()}
            {('HIN' in fetchedLayers) && activeLayers.includes('HIN') && hinLayer()}
            {('lur' in fetchedLayers) && activeLayers.includes('lur') && lurLayer()}
            {/*<ZoomControl position="bottomleft" />*/}
        </>
    )
}

const layerInfos = allLayerInfos.filter(({ key }) => ['wards', 'roads', 'bmp', 'bikeLanes', 'citibike',].includes(key))
const layerKeys = layerInfos.map(({ key }) => key)

export default function Home({ layers, }) {
    const params = {
        l: enumMultiParam({
            init: [ 'wards', 'bikeLanes', 'citibike', /*'bmp',*/ ],
            allValues: layerKeys,
            mapper: { 'wards': 'w', 'bikeLanes': 'b', 'citibike': 'c', 'bmp': 'p', 'roads': 'r', },
            delim: '',
        }),
        ll: llParam(DEFAULT_CENTER, 3),
        z: floatParam(DEFAULT_ZOOM),
    }
    const {
        ll: [ { lat, lng }, setLL ],
        z: [ zoom, setZoom, ],
        l: [ rawActiveLayers, { add: addActiveLayer, remove: removeActiveLayer } ],
    } = parseQueryParams({ params })

    const activeLayers = useMemo(
        () =>
            Array
                .from(rawActiveLayers)
                .map(k => [ layerOrder.indexOf(k), k ])
                .sort(([ l ], [ r ]) => l - r)
                .map(([ _, k ]) => k),
        [rawActiveLayers]
    )

    const [ fetchedLayers, addFetchedLayer ] = useReducer(
        (layers, [ k, layer ]) => {
            if (k in layers) {
                if (layer[k]) {
                    console.warn(`fetchLayers: duplicate add ${k}`)
                    return layers
                } else {
                    console.log(`fetchLayers: updating ${k} (${layer.length} elems)`)
                    return Object.fromEntries(Object.entries(layers).map(([ key, val ]) => key === k ? [ key, layer ] : [ key, val ]))
                }
            } else {
                console.log(`fetchLayers: setting ${k}: ${layer}`)
                const newLayers = { ...layers }
                newLayers[k] = layer
                return newLayers
            }
        },
        layers
    )

    console.log("render: fetchedLayers:", fetchedLayers)
    const activeLayerIndices = useMemo(
        () => Object.fromEntries(activeLayers.filter(k => k in fetchedLayers && fetchedLayers[k]).map((k, idx) => [ k, idx ])),
        [ fetchedLayers, activeLayers, ]
    )

    const [ showSettings, setShowSettings ] = useState(false)
    const [ hoverSettings, setHoverSettings ] = useState(false)

    const href = (typeof window !== 'undefined') && window.location.href || undefined
    const match = href?.match(pathnameRegex);
    const pathname = match ? match[0] : href;

    const title = useMemo(() => {
        let title
        const titleElems = []
        if (activeLayers.includes('bikeLanes')) titleElems.push(['Protected Bike Lanes'])
        if (activeLayers.includes('roads')) titleElems.push(['Roads'])
        if (activeLayers.includes('wards')) titleElems.push(['Wards'])
        if (titleElems.length === 0) {
            title = null
        } else if (titleElems.length === 1) {
            title = `JC ${titleElems[0]}`
        } else if (titleElems.length === 2) {
            title = `JC ${titleElems[0]} & ${titleElems[1]}`
        } else if (titleElems.length === 3) {
            title = `JC ${titleElems[0]}, ${titleElems[1]}, & ${titleElems[2]}`
        }
        console.log(activeLayers, title, titleElems)
        return title
    }, [ activeLayers ])

    useEffect(() => {
        const fetchLayer = async (k) => {
            if (!href) return Promise.resolve()
            if (k in fetchedLayers) {
                if (fetchedLayers[k]) {
                    console.log(`${k}: already fetched`)
                } else {
                    console.log(`${k}: currently fetching`)
                }
                return Promise.resolve()
            }
            addFetchedLayer([ k, null ])
            const path = dataUrls[k]
            const url = `${pathname}/${path}`
            console.log(`fetching layer: ${k}, url: ${url}`)
            const res = await fetch(url)
            console.log(`fetched layer: ${k}`)
            let newLayer
            if (k === 'lur') {
                const buf = await res.text()
                const parserOpts = { ignoreAttributes: false }
                const parser = new XMLParser(parserOpts)
                const obj = parser.parse(buf)
                const pts = obj.gpx.trk.trkseg.trkpt
                const positions = pts.map(pt => [ parseFloat(pt['@_lat']), parseFloat(pt['@_lon']), ])
                newLayer = positions
                console.log("got gpx positions:", positions)
            } else {
                const json = await res.json()
                newLayer = json['features']
                console.log(`layer ${k}:`, newLayer)
            }
            addFetchedLayer([ k, newLayer ])
            addActiveLayer(k)
            return Promise.resolve()
        }

        Promise.all(activeLayers.map(fetchLayer)).catch(console.error)
    }, [ activeLayers ])

    return (
        <div className={styles.container}>
            <Head>
                <title>{title}</title>
                <link rel="icon" href="./favicon.ico" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />

                <meta name="twitter:card" content="summary" key="twcard" />
                <meta name="twitter:creator" content={"RunsAsCoded"} key="twhandle" />

                <meta property="og:url" content="https://bikejc.github.io/maps" key="ogurl" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://bikejc.github.io/maps/1-pbls.png" key="ogimage" />
                <meta property="og:site_name" content="Bike JC Protected Bike Lane Map" key="ogsitename" />
                <meta property="og:title" content="JC Protected Bike Lane & Ward Map" key="ogtitle" />
                <meta property="og:description" content={"≈10 protected bike lanes overlaid on the 6 council wards"} key="ogdesc" />
            </Head>

            <main className={styles.main}>{
                (typeof window !== undefined) && <>
                    <Map className={styles.homeMap} center={{ lat, lng, }} zoom={zoom} zoomControl={false}>
                        { props => MapLayer({
                            ...props,
                            activeLayerIndices,
                            fetchedLayers,
                            activeLayers,
                            setLL,
                            setZoom,
                        }) }
                    </Map>
                    <div className={styles.title}>{title}</div>
                    <div className={css.gearContainer} onMouseEnter={() => setHoverSettings(true)} onMouseLeave={() => setHoverSettings(false)}>
                        <div className={css.settings}>
                            <i className={`fa fa-gear ${css.gear}`} onClick={() => setShowSettings(!showSettings)} />
                            {
                                (showSettings || hoverSettings) &&
                                <div className={css.menu}>
                                    <ul className={css.layers}>
                                        {
                                            layerInfos.map(({ label, key, }) => {
                                                const active = activeLayers.includes(key)
                                                function onChange(e) {
                                                    const checked = e.target.checked
                                                    if (checked === active) {
                                                        console.error(`layer ${key}: checked ${checked} != active ${active}`)
                                                    }
                                                    if (checked) {
                                                        addActiveLayer(key)
                                                    } else {
                                                        removeActiveLayer(key)
                                                    }
                                                }
                                                return <li key={key}><label><input type={"checkbox"} onChange={onChange} checked={active} />{label}</label></li>
                                            })
                                        }
                                    </ul>
                                    <div className={css.icons}>
                                        <a href={"https://github.com/bikejc/maps"}><img alt={"GitHub logo"} className={css.icon} src={"./gh.png"} /></a>
                                        <a href={"https://bikejc.org"}><img alt={"Bike JC logo"} className={css.icon} src={"./logo.png"} /></a>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </>
            }</main>
        </div>
    )
}
