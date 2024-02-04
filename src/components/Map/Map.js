import {useEffect} from 'react';
import L from 'leaflet';

import styles from './Map.module.css';

import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
import {bikeLaneTypes, bmpLaneTypes, MAPS, wardInfos} from "../layers";

import {Circle, MapContainer, Polygon, Polyline, TileLayer, Tooltip, useMapEvents,} from 'react-leaflet'

function MapLayer({ activeLayerIndices, fetchedLayers, activeLayers, setLL, setZoom }) {
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
                    <Circle key={key} center={position} color={"lightblue"} radius={10} opacity={1} weight={10} fill={true} fillColor={"lightblue"} fillOpacity={1}>
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
                if (status === 'TABLED') return
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

const Map = (
    {
        className,
        activeLayerIndices, fetchedLayers, activeLayers, setLL, setZoom,
        ...rest
    }
) => {
    let mapClassName = styles.map;

    if ( className ) {
        mapClassName = `${mapClassName} ${className}`;
    }

    useEffect(() => {
        (async function init() {
            delete L.Icon.Default.prototype._getIconUrl;

            L.Icon.Default.mergeOptions({
                iconRetinaUrl: iconRetinaUrl.src,
                iconUrl: iconUrl.src,
                shadowUrl: shadowUrl.src,
            });
        })();
    }, []);

    return (
        <MapContainer className={mapClassName} {...rest}>
            <MapLayer {...{ activeLayerIndices, fetchedLayers, activeLayers, setLL, setZoom }} />
        </MapContainer>
    )
}

export default Map;
