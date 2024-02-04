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
import {useRouter} from "next/router";

const DEFAULT_CENTER = { lat: 40.720, lng: -74.066, }
const DEFAULT_ZOOM = 13

function loadFeatures(name) {
    const data = JSON.parse(fs.readFileSync(path.join(process.cwd(), `public/${name}`)))
    return data['features']
}

export async function getStaticProps(context) {
    const wards = loadFeatures('wards.json')
    const bikeLanes = loadFeatures('jc-pbls.json').filter(({ attributes }) => attributes.Type === 'PROTECTED BIKE LANE')
    const plannedBikeLanes = loadFeatures('JC_Planned_Protected_Bike_Lanes.json')
    const allBikeLanes = bikeLanes.concat(plannedBikeLanes)
    const layers = { wards, bikeLanes: allBikeLanes, }
    return {
        props: { layers }
    }
}

const layerInfos = allLayerInfos.filter(({ key }) => [ 'wards', 'roads', 'bmp', 'bikeLanes', 'citibike', 'HIN', ].includes(key))
const layerKeys = layerInfos.map(({ key }) => key)

export default function Home({ layers, }) {
    const params = {
        l: enumMultiParam({
            init: [ 'wards', 'bikeLanes', /* 'citibike', 'bmp', */ ],
            allValues: layerKeys,
            mapper: { 'wards': 'w', 'bikeLanes': 'b', 'citibike': 'c', 'bmp': 'p', 'roads': 'r', 'HIN': 'h' },
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
                if (layers[k]) {
                    console.warn(`fetchLayers: duplicate add ${k}`)
                    return layers
                } else {
                    console.log(`fetchLayers: updating ${k} (now ${layer?.length} elems):`, layer)
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

    // console.log("render: fetchedLayers:", fetchedLayers)
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
        // layerOrder = [ 'wards', 'counties', 'county2', 'county5', 'county10', 'roads', 'HIN', 'bmp', 'bikeLanes', 'citibike', ]
        if (activeLayers.includes('wards')) titleElems.push(['Wards'])
        if (activeLayers.includes('roads')) titleElems.push(['Roads'])
        if (activeLayers.includes('bikeLanes')) titleElems.push(['Protected Bike Lanes'])
        if (activeLayers.includes('HIN')) titleElems.push(['High Injury Network'])
        if (activeLayers.includes('bmp')) titleElems.push(['Bike Master Plan'])
        if (activeLayers.includes('citibike')) titleElems.push(['Citi Bike Docks'])
        if (titleElems.length === 0) {
            title = null
        } else {
            title = `JC ${titleElems.join(', ')}`
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

    const router = useRouter()
    const basePath = router.basePath

    return (
        <div className={styles.container}>
            <Head>
                <title>{title}</title>
                <link rel="icon" href={`${basePath}/favicon.ico`} />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />

                <meta name="twitter:card" content="summary" key="twcard" />
                <meta name="twitter:creator" content={"RunsAsCoded"} key="twhandle" />

                <meta property="og:url" content="https://map.bikejc.org" key="ogurl" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://map.bikejc.org/jc-pbl-map.png" key="ogimage" />
                <meta property="og:site_name" content="JC Bike Lane Map" key="ogsitename" />
                <meta property="og:title" content="JC Bike Lane + Ward Map" key="ogtitle" />
                <meta property="og:description" content={"≈10 protected bike lanes overlaid on the 6 council wards"} key="ogdesc" />
            </Head>
            <main className={styles.main}>{
                (typeof window !== undefined) && <>
                    <Map
                        className={styles.homeMap} center={{ lat, lng, }} zoom={zoom} zoomControl={false} zoomSnap={0.5} zoomDelta={0.5}
                        {...{activeLayerIndices, fetchedLayers, activeLayers, setLL, setZoom}}
                    />
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
                                        <a href={"https://github.com/bikejc/maps"}><img alt={"GitHub logo"} className={css.icon} src={`${basePath}/gh.png`} /></a>
                                        <a href={"https://bikejc.org"}><img alt={"Bike JC logo"} className={css.icon} src={`${basePath}/logo.png`} /></a>
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
