# Jersey City Protected Bike Lane + Ward Map

![](./imgs/screenshot.png)

## Data Fetching
Download layers from the city's arcgis server, as json:
```bash
format="json"
server="UXbywc7dSkfgdPp4"
service="JC_Bike_Network"
host="https://services2.arcgis.com"
feature_server_url="${host}/${server}/ArcGIS/rest/services/${service}/FeatureServer"

# Look up layer ID 
layer_id="$(curl "${feature_server_url}?f=${format}" | jq -r '.layers[] | .id')

# Fetch features
curl "${feature_server_url}/${layer_id}/query?f=${format}&where=1%3D1&returnGeometry=true&outFields=*&outSR=4326"
```
