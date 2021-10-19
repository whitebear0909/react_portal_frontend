import React, {Suspense} from 'react'
import {BrowserRouter} from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import {I18nProvider} from '../_metronic/i18n/i18nProvider'
import {LayoutProvider, LayoutSplashScreen} from '../_metronic/layout/core'
import AuthInit from './modules/auth/redux/AuthInit'
import {Routes} from './routing/Routes'

type Props = {
  basename: string
}

const App: React.FC<Props> = ({basename}) => {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <BrowserRouter basename={basename}>
        <I18nProvider>
          <LayoutProvider>
            <AuthInit>
              <Routes />
            </AuthInit>
          </LayoutProvider>
        </I18nProvider>
      </BrowserRouter>
      <Toaster position='top-right' />
    </Suspense>
  )
}

export {App}
