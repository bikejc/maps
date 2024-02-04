#!/usr/bin/env node

const puppeteer = require('puppeteer');
const {program} = require('commander');
const { mkdirSync } = require("fs")

const cwd = __dirname

const DEFAULT_INITIAL_LOAD_SELECTOR = '.leaflet-interactive'
const DEFAULT_DOWNLOAD_SLEEP = 1000
const DEFAULT_LOAD_TIMEOUT = 30000
const options =
    program
        .option('-d, --download-sleep <ms>', `Sleep for this many milliseconds while waiting for file downloads; default: ${DEFAULT_DOWNLOAD_SLEEP}`)
        .option('-h, --host <host or port>', 'Hostname to load screenshots from; numeric <port> is mapped to 127.0.0.1:<port>')
        .option('-i, --include <regex>', 'Only generate screenshots whose name matches this regex')
        .option('-l, --load-timeout <ms>', `Sleep for this many milliseconds while waiting for initial "${DEFAULT_INITIAL_LOAD_SELECTOR}" selector; default: ${DEFAULT_LOAD_TIMEOUT}`)
        .parse(process.argv)
        .opts()

let scheme
let {host, include, downloadSleep: defaultDownloadSleep = DEFAULT_DOWNLOAD_SLEEP, loadTimeout: defaultLoadTimeout = DEFAULT_LOAD_TIMEOUT } = options
if (host) {
    scheme = 'http'
    if (host.match(/^\d+$/)) {
        host = `127.0.0.1:${host}`
    }
} else {
    host = 'map.bikejc.org'
    scheme = 'https'
}
console.log("host:", host, "includes:", include);

(async () => {
    const dir = `${cwd}/public/screenshots`
    mkdirSync(dir, { recursive: true })
    const screens = {
        'pbls': { query: '?ll=40.72_-74.068&z=14', width: 950, height: 1300, preScreenshotSleep: 500, },
        'pbls-roads': { query: '?l=wbr&ll=40.72_-74.068&z=14', width: 950, height: 1300, preScreenshotSleep: 500, },
    }

    const browser = await puppeteer.launch({ headless: 'new', });
    const page = await browser.newPage();

    const items = Array.from(Object.entries(screens))
    for (let [ name, { query, width, height, selector, download, loadTimeout, downloadSleep, preScreenshotSleep } ] of items) {
        if (include && !name.match(include)) {
            console.log(`Skipping ${name}`)
            continue
        }
        width = width || 800
        height = height || 580
        loadTimeout = loadTimeout || defaultLoadTimeout
        downloadSleep = downloadSleep || defaultDownloadSleep
        selector = selector || DEFAULT_INITIAL_LOAD_SELECTOR
        const url = `${scheme}://${host}/${query}`
        const path = `${dir}/${name}.png`
        if (download) {
            console.log(`Setting download behavior to ${dir}`)
            await page._client().send('Page.setDownloadBehavior', {
                behavior: 'allow',
                downloadPath: dir
            });
        }
        console.log(`Loading ${url}`)
        await page.goto(url);
        console.log(`Loaded ${url}`)

        await page.setViewport({ width, height });
        console.log("setViewport")
        await page.waitForSelector(selector, { timeout: loadTimeout });
        console.log("selector")
        if (preScreenshotSleep) {
            await new Promise(r => setTimeout(r, preScreenshotSleep))
        }
        if (!download) {
            await page.screenshot({path});
        } else {
            console.log("sleep 1s")
            await new Promise(r => setTimeout(r, downloadSleep))
            console.log("sleep done")
        }
    }

    await browser.close();
})();
