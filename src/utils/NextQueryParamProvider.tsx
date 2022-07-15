import {useRouter} from 'next/router';
import React, {ComponentProps, memo, useMemo} from 'react';
// This dependency is bundled
// eslint-disable-next-line import/no-extraneous-dependencies
import {QueryParamProvider} from 'use-query-params';

type Props = Omit<
    ComponentProps<typeof QueryParamProvider>,
    'ReactRouterRoute' | 'reachHistory' | 'history' | 'location'
    > & {shallow?: boolean};

const pathnameRegex = /[^?#]+/u;

function NextQueryParamProvider({children, shallow = true, ...rest}: Props) {
    const router = useRouter();
    const match = router.asPath.match(pathnameRegex);
    const pathname = match ? match[0] : router.asPath;
    const query = router.query

    const location = useMemo(() => {
        console.log("re-computing location")
        if (typeof window !== 'undefined') {
            // For SSG, no query parameters are available on the server side,
            // since they can't be known at build time. Therefore to avoid
            // markup mismatches, we need a two-part render in this case that
            // patches the client with the updated query parameters lazily.
            // Note that for SSR `router.isReady` will be `true` immediately
            // and therefore there's no two-part render in this case.
            if (router.isReady) {
                console.log(`router.isReady! window.location.href: ${window.location.href}, router.query:`, router.query)
                return window.location;
            } else {
                console.log("Return empty search location")
                return {search: ''} as Location;
                // console.log("Return empty hash location")
                // return {hash: ''} as Location;
            }
        } else {
            // On the server side we only need a subset of the available
            // properties of `Location`. The other ones are only necessary
            // for interactive features on the client.
            const search = router.asPath.replace(pathnameRegex, '')
            console.log("returning search:", search, "router.asPath:", router.asPath, "router.query:", router.query)
            return {search} as Location;
            // const hash = router.asPath.replace(pathnameRegex, '')
            // console.log("returning hash:", hash, "router.asPath:", router.asPath, "router.query:", router.query)
            // return {hash} as Location;
        }
    }, [ router.asPath, router.isReady, ]);

    const history = useMemo(() => {
        console.log("re-computing history")
        function createUpdater(routeFn: typeof router.push) {
            return function updater({hash, search}: Location) {
                console.log(`updater; hash "${hash}", search "${search}", router.query:`, router.query)
                // hash = search.substr(1)
                // search = ''
                routeFn(
                    // {pathname: router.pathname, search, hash},
                    // {pathname, search, hash},
                    {pathname: router.pathname, hash, search},
                    {pathname, hash, search},
                    {shallow, scroll: false}
                ).then(rv => console.log("routeFn returned:", rv));
            };
        }

        return {
            push: createUpdater(router.push),
            replace: createUpdater(router.replace),
            location,
        };
    }, [location, pathname, router, shallow]);

    return (
        <QueryParamProvider {...rest} history={history} location={location}>
            {children}
        </QueryParamProvider>
    );
}

export default memo(NextQueryParamProvider);
