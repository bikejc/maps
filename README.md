# 🍃 Next.js Leaflet Starter

```bash
curl 'https://services2.arcgis.com/UXbywc7dSkfgdPp4/ArcGIS/rest/services/JC_Planned_Protected_Bike_Lanes/FeatureServer/3/query?f=json&where=1%3D1&returnGeometry=true&outFields=*&outSR=4326&resultOffset=0&resultRecordCount=10000' | jq | tee JC_Planned_Protected_Bike_Lanes.json
```

Jumpstart your new Next.js mapping project with Leaflet!

## ⚡ Quick Deploy
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/colbyfayock/next-leaflet-starter) [![Deploy with Vercel Now](https://zeit.co/button)](https://vercel.com/import/project?template=https://github.com/colbyfayock/next-leaflet-starter)


## 🧰 What This Includes
* [Yarn](https://yarnpkg.com/en/)
* [Next.js](https://nextjs.org/)
* [Leaflet](https://leafletjs.com/)
* [React Leaflet](https://react-leaflet.js.org)

## 🚀 Getting Started

### Requirements
* [Yarn](https://yarnpkg.com/en/)

### Quick Start
```
yarn create next-app -e https://github.com/colbyfayock/next-leaflet-starter my-leaflet-app
```

### Running the Project
First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.
