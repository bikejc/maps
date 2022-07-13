#!/usr/bin/env python

from os import makedirs
from os.path import dirname, exists

import click
import json
from requests import get


@click.command()
@click.argument('service')
def main(service):
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
            print(f'Found {outpath}; skipping')
            continue
        makedirs(dirname(outpath), exist_ok=True)
        url = f"{feature_server_url}/{layer_id}/query?f={format}&where=1%3D1&returnGeometry=true&outFields=*&outSR=4326"
        print(f'Fetching {url} to {outpath}')
        resp = get(url).json()
        with open(outpath, 'w') as f:
            f.write(json.dumps(resp, indent=4))


if __name__ == '__main__':
    main()
