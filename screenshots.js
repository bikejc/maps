#!/usr/bin/env node

const puppeteer = require('puppeteer');
const {program} = require('commander');
const { mkdirSync } = require("fs")

const cwd = __dirname

const DEFAULT_WIDTH = 800
const DEFAULT_HEIGHT = 580
const DEFAULT_INITIAL_LOAD_SELECTOR = '.leaflet-interactive'
const DEFAULT_DOWNLOAD_SLEEP = 1000
const DEFAULT_LOAD_TIMEOUT = 30000
const DEFAULT_PRE_SCREENSHOT_SLEEP = 1500
const options =
    program
        .option('-d, --download-sleep <ms>', `Sleep for this many milliseconds while waiting for file downloads; default: ${DEFAULT_DOWNLOAD_SLEEP}`)
        .option('-H, --host <host or port>', 'Hostname to load screenshots from; numeric <port> is mapped to 127.0.0.1:<port>')
        .option('-i, --include <regex>', 'Only generate screenshots whose name matches this regex')
        .option('-l, --load-timeout <ms>', `Sleep for this many milliseconds while waiting for initial "${DEFAULT_INITIAL_LOAD_SELECTOR}" selector; default: ${DEFAULT_LOAD_TIMEOUT}`)
        .option('-p, --pre-screenshot-sleep <ms>', `Sleep for this many milliseconds before taking a screenshot; default: ${DEFAULT_PRE_SCREENSHOT_SLEEP}`)
        .option('-w, --width <px>', `Width of the screenshot; default: ${DEFAULT_WIDTH}`)
        .option('-h, --height <px>', `Height of the screenshot; default: ${DEFAULT_HEIGHT}`)
        .parse(process.argv)
        .opts()

console.log("options:", options)
let scheme
let {
    host,
    include,
    width: defaultWidth = DEFAULT_WIDTH,
    height: defaultHeight = DEFAULT_HEIGHT,
    downloadSleep: defaultDownloadSleep = DEFAULT_DOWNLOAD_SLEEP,
    loadTimeout: defaultLoadTimeout = DEFAULT_LOAD_TIMEOUT,
    preScreenshotSleep: defaultPreScreenshotSleep = DEFAULT_PRE_SCREENSHOT_SLEEP,
} = options
if (host) {
    scheme = 'http'
    if (host.match(/^\d+$/)) {
        host = `127.0.0.1:${host}`
    }
} else {
    host = 'map.bikejc.org'
    scheme = 'https'
}
console.log("host:", host, "includes:", include, "defaultPreScreenshotSleep:", defaultPreScreenshotSleep);

(async () => {
    const dir = `${cwd}/public/screenshots`
    mkdirSync(dir, { recursive: true })
    const screens = {
        'pbls': { query: '?ll=40.72_-74.068&z=14', width: 950, height: 1300, },
        'pbls-roads': { query: '?l=wbr&ll=40.72_-74.068&z=14', width: 950, height: 1300, },
    }

    const browser = await puppeteer.launch({ headless: 'new', });
    const page = await browser.newPage();

    const items = Array.from(Object.entries(screens))
    for (let [
        name,
        item
    ] of items) {
        const {
            query,
            width = defaultWidth,
            height = defaultHeight,
            selector = DEFAULT_INITIAL_LOAD_SELECTOR,
            download,
            loadTimeout = defaultLoadTimeout,
            downloadSleep = defaultDownloadSleep,
            preScreenshotSleep = defaultPreScreenshotSleep,
        } = item
        console.log("item:", item)
        if (include && !name.match(include)) {
            console.log(`Skipping ${name}`)
            return
        }
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
        console.log(`found selector: ${selector}`)
        if (preScreenshotSleep) {
            console.log("preScreenshotSleep:", preScreenshotSleep)
            await new Promise(r => setTimeout(r, preScreenshotSleep))
        }
        if (!download) {
            console.log("screenshot:", path)
            await page.screenshot({path});
        } else {
            console.log(`sleep ${downloadSleep / 1000}s`)
            await new Promise(r => setTimeout(r, downloadSleep))
            console.log("sleep done")
        }
    }
    await browser.close();
})();
