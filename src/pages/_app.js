import '../../styles/globals.css'
import NextQueryParamProvider from '../utils/NextQueryParamProvider';

function MyApp({ Component, pageProps }) {
  return (
      <NextQueryParamProvider>
        <Component {...pageProps} />
      </NextQueryParamProvider>
  )
}

export default MyApp
