import {useRouter} from "next/router";
import {useEffect, useState} from "react";

export const pathnameRegex = /[^?#]+/u;

export function llParam(init, places) {
    return {
        encode: ({ lat, lng }) => places ? `${lat.toFixed(places)}_${lng.toFixed(places)}` : `${lat}_${lng}`,
        decode: v => {
            if (!v) return init
            const [ lat, lng ] = v.split("_").map(parseFloat)
            return { lat, lng }
        },
    }
}

export function floatParam(init) {
    return { encode: v => v.toString(), decode: v => v ? parseFloat(v) : init }
}

export function parseQueryParams({ params }) {
    const router = useRouter()
    const searchStr = router.asPath.replace(pathnameRegex, '')
    const search = Object.fromEntries(new URLSearchParams(searchStr).entries())
    const state = Object.fromEntries(
        Object.entries(params).map(([ k, param ]) => {
            const [ val, set ] = useState(param.decode(search[k]))
            return [ k, { val, set, param } ]
        })
    )
    const stateValues = Object.values(state).map(({ val }) => val)

    const match = router.asPath.match(pathnameRegex);
    const pathname = match ? match[0] : router.asPath;

    useEffect(
        () => {
            const query = {}
            Object.entries(state).map(([ k, { val, param, } ]) => {
                const s = param.encode(val)
                if (s !== undefined) {
                    query[k] = s
                }
            })
            const search = new URLSearchParams(query).toString()
            const hash = ''
            router.replace(
                { pathname: router.pathname, hash, search},
                { pathname, hash, search, },
                { shallow: true, scroll: false, }
            )
        },
        [ ...stateValues, pathname, ]
    )

    return Object.fromEntries(Object.entries(state).map(([ k, { val, set, }]) => [ k, [ val, set, ] ]))
}
