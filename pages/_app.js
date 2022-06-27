

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  const Noop = ({children}) => <>{children}</>
  const Layout = Component.Layout ?? Noop

  return (
    <Layout>
      <ToastContainer/>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp


