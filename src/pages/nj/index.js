import getConfig from 'next/config'
import Head from 'next/head';
import css from '../index.module.scss'
import seedrandom from 'seedrandom'

import Map from '../../components/Map';

import styles from '../../../styles/Home.module.css';

import {Fragment, useEffect, useMemo, useReducer, useState} from "react";
import {allLayerInfos, dataUrls, layerOrder, MAPS} from "../../components/layers";
import {useSet} from "../../utils/use-set";
import {floatParam, llParam, parseQueryParams} from "../../utils/params";

const DEFAULT_CENTER = { lat: 40.1067, lng: -74.9362 }
const DEFAULT_ZOOM = 9

function randomColor() {
    const [ r, g, b ] = [0, 1, 2].map(() => parseInt(Math.random() * 256).toString(16)).map(c => c.length < 2 ? `0${c}` : c)
    return `#${r}${g}${b}`
}

function MapLayer({ useMapEvents, TileLayer, Polygon, Tooltip, activeLayerIndices, fetchedLayers, activeLayers, setLL, setZoom, }) {
    const map = useMapEvents({
        move: () => setLL(map.getCenter(), 'replaceIn'),
        zoom: () => setZoom(map.getZoom(), 'replaceIn'),
    })

    const countiesLayer = (layerKey) => {
        seedrandom(4, { global: true })
        const rank = activeLayerIndices[layerKey]
        return (
            fetchedLayers[layerKey]?.map(({properties, geometry}) => {
                const { COUNTY, COUNTY_LABEL, POP2010, POPDEN2010, } = properties
                const {type, coordinates} = geometry
                const fillColor = randomColor()

                function Poly({ key, positions, }) {
                    return <Fragment key={key}>
                        <Polygon style={{zIndex: 1}} weight={1} color={"black"} fillColor={fillColor} key={key}
                                 positions={positions} fillOpacity={0.4}>
                            <Tooltip sticky={true}>
                                <span key={"county"}>{COUNTY_LABEL}</span>
                                <br key={"br"} />
                                <span key={"population"}>2010 population: {POP2010.toLocaleString()} ({POPDEN2010.toLocaleString()}/mi²)</span>
                            </Tooltip>
                        </Polygon>
                        {/*{*/}
                        {/*    positions.map((p, idx) =>*/}
                        {/*        <Circle key={`${key}_point${idx}`} center={p} color={fillColor} radius={10}>*/}
                        {/*            <Tooltip sticky={true}>{COUNTY}: {p}</Tooltip>*/}
                        {/*        </Circle>*/}
                        {/*    )*/}
                        {/*}*/}
                    </Fragment>
                }
                if (type === "MultiPolygon") {
                    return (
                        coordinates.map((coords, coordsIdx) =>
                            coords.map((polygon, polygonIdx) => {
                                const positions = polygon.map(([lng, lat]) => [lat, lng])
                                const key = `county-${COUNTY}_coords${coordsIdx}_polygon${polygonIdx}_rank${rank}`
                                return Poly({ key, positions, })
                            })
                        )
                    )
                } else if (type === "Polygon") {
                    return (
                        coordinates.map((polygon, idx) => {
                            const positions = polygon.map(([lng, lat]) => [lat, lng])
                            const key = `${layerKey}-${COUNTY}_polygon${idx}_rank${rank}`
                            return Poly({ key, positions, })
                        })
                    )
                } else {
                    console.warn(`County ${COUNTY}: unexpected geometry type ${type}`)
                    return null;
                }
            })
        )
    }

    const { url, attribution } = MAPS['alidade_smooth_dark']

    return (
        <>
            <TileLayer url={url} attribution={attribution}/>
            {('counties' in fetchedLayers) && activeLayers.includes('counties') && countiesLayer('counties')}
            {('county2' in fetchedLayers) && activeLayers.includes('county2') && countiesLayer('county2')}
            {('county5' in fetchedLayers) && activeLayers.includes('county5') && countiesLayer('county5')}
            {('county10' in fetchedLayers) && activeLayers.includes('county10') && countiesLayer('county10')}
        </>
    )
}

export default function Home({}) {
    const layers = []
    const [ rawActiveLayers, { add: addActiveLayer, remove: removeActiveLayer } ] = useSet([ 'county10' ])
    let activeLayers = Array.from(rawActiveLayers).map(k => [ layerOrder.indexOf(k), k ]).sort(([ l ], [ r ]) => l - r).map(([ _, k ]) => k)

    const params = {
        ll: llParam(DEFAULT_CENTER, 3),
        z: floatParam(DEFAULT_ZOOM),
    }
    const { ll: [ { lat, lng }, setLL ], z: [ zoom, setZoom, ] } = parseQueryParams({ params })

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

    const activeLayerIndices = useMemo(
        () => Object.fromEntries(activeLayers.filter(k => k in fetchedLayers && fetchedLayers[k]).map((k, idx) => [ k, idx ])),
        [ fetchedLayers, activeLayers, ]
    )

    const [ showSettings, setShowSettings ] = useState(false)
    const [ hoverSettings, setHoverSettings ] = useState(false)

    const href = (typeof window !== 'undefined') && window.location.href

    const title = ""

    const { publicRuntimeConfig: config } = getConfig()
    const { basePath = "" } = config

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
            const url = `${basePath}/${path}`
            console.log(`fetching layer: ${k}`)
            const res = await fetch(url)
            console.log(`fetched layer: ${k}`)
            const json = await res.json()
            const newLayer = json['features']
            console.log(`layer ${k}:`, newLayer)
            addFetchedLayer([ k, newLayer ])
            addActiveLayer(k)
            return Promise.resolve()
        }

        Promise.all(activeLayers.map(fetchLayer)).catch(console.error)
    }, [ rawActiveLayers ])

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
                <meta property="og:site_name" content="New Jersey County Map" key="ogsitename" />
                <meta property="og:title" content="New Jersey County Map" key="ogtitle" />
                <meta property="og:description" content={"County boundaries in NJ state"} key="ogdesc" />
            </Head>

            <main className={styles.main}>{
                (typeof window !== undefined) && <>
                    <Map className={styles.homeMap} center={{ lat, lng }} zoom={zoom} zoomControl={true} zoomDelta={0.5} zoomSnap={0.5}>
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
                                            allLayerInfos.map(({ label, key, }) => {
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
                </>}
            </main>
        </div>
    )
}
