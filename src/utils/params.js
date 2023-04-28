import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {useSet} from "./use-set";

export const pathnameRegex = /[^?#]+/u;

export function llParam(init, places) {
    return {
        encode: ({ lat, lng }) => (lat === init.lat && lng === init.lng) ? undefined : (places ? `${lat.toFixed(places)}_${lng.toFixed(places)}` : `${lat}_${lng}`),
        decode: v => {
            if (!v) return init
            const [ lat, lng ] = v.split("_").map(parseFloat)
            return { lat, lng }
        },
    }
}

export function floatParam(init) {
    return { encode: v => v === init ? undefined : v.toString(), decode: v => v ? parseFloat(v) : init }
}

export function enumMultiParam({ init, allValues, mapper, delim }) {
    delim = typeof delim === 'undefined' ? '_' : delim
    let reverseMapper
    if (mapper) {
        reverseMapper = Object.fromEntries(Object.entries(mapper).map(([ k, v, ]) => [ v, k, ]))
    }
    function verify(values) {
        return Array.from(values).filter(v => {
            if (allValues.includes(v)) {
                return true
            } else {
                console.warn(`Invalid value: ${v} not in ${allValues}`)
                return false
            }
        })
    }

    const encode = values => {
        values = verify(values)
        if (mapper) {
            values = values.map(v => mapper[v])
        }
        return values.join(delim)
    }

    const encodedInit = encode(init)

    return {
        encode: values => {
            const enc = encode(values)
            if (enc === encodedInit) return undefined
            return enc
        },
        decode: s => {
            if (!s && s !== '') {
                return init
            }
            let values = s.split(delim)
            if (reverseMapper) {
                values = values.filter(v => {
                    if (v in reverseMapper) {
                        return true
                    } else {
                        console.warn(`Unrecognized value: ${v} not in ${Object.keys(reverseMapper).join(",")}`)
                        return false
                    }
                }).map(v => reverseMapper[v])
            }
            values = verify(values)
            return values
        },
        use: useSet,
    }
}

export function parseQueryParams({ params }) {
    const router = useRouter()
    const searchStr = router.asPath.replace(pathnameRegex, '')
    const search = Object.fromEntries(new URLSearchParams(searchStr).entries())
    const state = Object.fromEntries(
        Object.entries(params).map(([ k, param ]) => {
            const [ val, set ] = (param.use || useState)(param.decode(search[k]))
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
