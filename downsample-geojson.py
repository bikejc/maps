#!/usr/bin/env python

import click
import haversine as hs
import json


def downsample_array(arr, freq):
    distances = {
        idx: {
            'idx': idx,
            'val': val,
            'prv_idx': None,
            'nxt_idx': None,
        }
        for idx, val in enumerate(arr)
    }
    N = len(arr)
    for i in range(N):
        o = distances[i]

        if i > 0:
            o['prv_idx'] = i - 1

        if i + 1 < N:
            o['nxt_idx'] = i + 1

        if 0 < i < N - 1:
            o['d'] = hs.haversine(distances[i - 1]['val'], distances[i + 1]['val'])

    initial_min_distance = None
    target_num = (len(arr) + freq - 1) // freq
    while True:
        sorted_distances = list(sorted(filter(lambda o: 'd' in o, distances.values()), key=lambda o: o['d']))
        obj = sorted_distances[0]
        if len(distances) <= target_num:
            final_min_distance = obj['d']
            break
        if initial_min_distance is None:
            initial_min_distance = obj['d']
        idx = obj['idx']
        prv_idx = obj['prv_idx']
        nxt_idx = obj['nxt_idx']
        prv = distances[prv_idx]
        nxt = distances[nxt_idx]
        prv2_idx = distances[prv_idx].get('prv_idx')
        nxt2_idx = distances[nxt_idx].get('nxt_idx')
        prv2 = None if prv2_idx is None else distances.get(prv2_idx)
        nxt2 = None if nxt2_idx is None else distances.get(nxt2_idx)

        # print(f'{len(distances)} > {target_num}: rm {idx}, distance {obj["d"]}, {prv2_idx}→{prv_idx}→{idx}→{nxt_idx}→{nxt2_idx}')

        prv['nxt_idx'] = obj['nxt_idx']
        if 'd' in prv:
            prv['d'] = None if prv2 is None else hs.haversine(prv2['val'], nxt['val'])
        nxt['prv_idx'] = obj['prv_idx']
        if 'd' in nxt:
            nxt['d'] = None if nxt2 is None else hs.haversine(prv['val'], nxt2['val'])

        del distances[idx]

    print(f'Reduced polygon from {N} to {len(distances)} points, min distance {initial_min_distance} to {final_min_distance}')
    # print(f'Reduced indices: {" ".join([ str(o["idx"]) for o in distances.values() ])}')
    return [ o['val'] for o in distances.values() ]


@click.command()
@click.option('-f', '--frequency', type=int, required=True)
@click.argument('path', required=True)
@click.argument('outpath', required=True)
def main(path, frequency, outpath):
    with open(path, 'r') as f:
        gj = json.load(f)

    features = gj['features']
    for idx, feature in enumerate(features):
        geometry = feature['geometry']
        typ = geometry['type']
        if typ == 'Polygon':
            geometry['coordinates'] = [ downsample_array(shape, frequency) for shape in geometry['coordinates'] ]
        elif typ == 'MultiPolygon':
            coordinates = []
            for coords in geometry['coordinates']:
                coords = [ downsample_array(shape, frequency) for shape in coords ]
                coordinates.append(coords)
            geometry['coordinates'] = coordinates
        else:
            raise RuntimeError(f'Feature {idx}: unrecognized geometry type {typ}. {feature["properties"]}')

    with open(outpath, 'w') as f:
        json.dump(gj, f)


if __name__ == '__main__':
    main()
