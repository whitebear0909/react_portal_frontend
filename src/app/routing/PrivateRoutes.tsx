import React, {Suspense, lazy} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {FallbackView} from '../../_metronic/partials'
import DashboardWrapper from '../pages/dashboard/DashboardWrapper'
import {MenuTestPage} from '../pages/MenuTestPage'
import QuotesPage from '../pages/sales-quotes/QuotesPage'
import SalesOrdersPage from '../pages/sales-orders/SalesOrdersPage'
import ServiceOrdersPage from '../pages/service-orders/ServiceOrdersPage'
import CalibrationReportsPage from '../pages/calibration-reports/CalibrationReportsPage'
import DeleteCustomer from '../pages/customer/DeleteCustomer'
import ResendCustomerInvite from '../pages/customer/ResendInvite'
import NewCustomer from '../pages/customer/NewCustomer'
import ViewCustomer from '../pages/customer/ViewCustomer'
import EditCustomer from '../pages/customer/EditCustomer'
import EditNBSAdmin from '../pages/nbs-admin/EditNBSAdmin'
import DeleteNBSAdmin from '../pages/nbs-admin/DeleteNBSAdmin'
import NewNBSAdmin from '../pages/nbs-admin/NewNBSAdmin'
import ResendInviteNBSAdmin from '../pages/nbs-admin/ResendInvite'

export function PrivateRoutes() {
  const BuilderPageWrapper = lazy(() => import('../pages/layout-builder/BuilderPageWrapper'))
  const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'))
  const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
  const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
  const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
  const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))

  return (
    <Suspense fallback={<FallbackView />}>
      <Switch>
        <Route path='/dashboard' component={DashboardWrapper} />
        <Route path='/builder' component={BuilderPageWrapper} />
        <Route path='/crafted/pages/profile' component={ProfilePage} />
        <Route path='/crafted/pages/wizards' component={WizardsPage} />
        <Route path='/crafted/widgets' component={WidgetsPage} />
        <Route path='/crafted/account' component={AccountPage} />

        <Route path='/statistics/sales-quotes' component={QuotesPage} />
        <Route path='/statistics/sales-orders' component={SalesOrdersPage} />
        <Route path='/statistics/service-orders' component={ServiceOrdersPage} />
        <Route path='/statistics/calibration-reports' component={CalibrationReportsPage} />

        <Route path='/customers/new' component={NewCustomer} />
        <Route path='/customers/delete/:id' component={DeleteCustomer} />
        <Route path='/customers/view/:id' component={ViewCustomer} />
        <Route path='/customers/edit/:id' component={EditCustomer} />
        <Route path='/customers/invite/:id' component={ResendCustomerInvite} />

        <Route path='/nbs-admins/new' component={NewNBSAdmin} />
        <Route path='/nbs-admins/delete/:id' component={DeleteNBSAdmin} />
        <Route path='/nbs-admins/edit/:id' component={EditNBSAdmin} />
        <Route path='/nbs-admins/invite/:id' component={ResendInviteNBSAdmin} />

        <Route path='/apps/chat' component={ChatPage} />
        <Route path='/menu-test' component={MenuTestPage} />
        <Redirect from='/auth' to='/dashboard' />
        <Redirect exact from='/' to='/dashboard' />
        <Redirect to='/error/404' />
      </Switch>
    </Suspense>
  )
}
