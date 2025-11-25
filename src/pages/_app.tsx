import React, { useEffect } from 'react'
import { AnimatePresence } from 'motion/react'
import TagManager from 'react-gtm-module'

import '../styles/reset.scss'
import '../styles/global.scss'
import '../styles/custom.scss'
import 'swiper/css'
import 'swiper/css/navigation'

function MyApp({ Component, pageProps, router }) {
  // Google Tag Manager start
  useEffect(() => {
    TagManager.initialize({ gtmId: 'GTM-KXKK9QK' })
  }, [])

  useEffect(() => {
    document.body.classList?.remove('loading')
  }, [])
  // Google Tag Manager end

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [router.asPath])

  return (
    <>
      <Component key={router.asPath} {...pageProps} />
    </>
  )
}

export default MyApp
