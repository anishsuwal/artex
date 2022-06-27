
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  const Noop = ({children}) => <>{children}</>
  const Layout = Component.Layout ?? Noop

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp


