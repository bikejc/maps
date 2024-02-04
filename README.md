[![Jersey City Protected Bike Lane + Ward Map](./public/jc-pbl-map.png)](https://map.bikejc.org)

## Interactive version: [map.bikejc.org](https://map.bikejc.org)

### Compared with the full road network <a id="pbls-vs-roads"></a>

![](public/pbls-roads.gif)

## Scratchwork

### Process screenshots

```bash
for f in 1-pbls.png 2-roads.png; do
    convert -strip -crop 2240x2660+982+238 orig/$f cropped/$f
done
```
```bash
convert -resize 50% -delay 150 -loop 0 cropped/1-pbls.png cropped/2-roads.png pbls-roads.gif
```

### Fetch Data
See [`download-map.py`](./download-map.py).
