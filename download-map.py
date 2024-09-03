#!/usr/bin/env python

from os import makedirs
from os.path import dirname, exists

import click
import json
from requests import get
from utz import err


# https://services2.arcgis.com/UXbywc7dSkfgdPp4/ArcGIS/rest/services/Jersey_City_Bike_Network/FeatureServer/55/query?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&relationParam=&returnGeodetic=false&outFields=*&returnGeometry=true&returnEnvelope=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=4326&defaultSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson&token=
@click.command()
@click.option('-f', '--overwrite', is_flag=True)
@click.argument('service')
def main(overwrite, service):
    format = "json"
    server = "UXbywc7dSkfgdPp4"
    host = "https://services2.arcgis.com"
    feature_server_url = f"{host}/{server}/ArcGIS/rest/services/{service}/FeatureServer"

    resp = get(f"{feature_server_url}?f={format}")
    body = resp.json()
    layers = body['layers']
    for layer in layers:
        layer_id = layer['id']
        name = layer['name']
        outpath = f'public/{service}/{name}.json'
        if exists(outpath):
            if overwrite:
                err(f'Found {outpath}; overwriting')
            else:
                err(f'Found {outpath}; skipping')
                continue
        makedirs(dirname(outpath), exist_ok=True)
        url = f"{feature_server_url}/{layer_id}/query?f={format}&where=1%3D1&returnGeometry=true&outFields=*&outSR=4326"
        err(f'Fetching {url} to {outpath}')
        resp = get(url).json()
        with open(outpath, 'w') as f:
            f.write(json.dumps(resp, indent=4))


if __name__ == '__main__':
    main()
