/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import {useIntl} from 'react-intl'
import {KTSVG} from '../../../helpers'
import {AsideMenuItemWithSub} from './AsideMenuItemWithSub'
import {AsideMenuItem} from './AsideMenuItem'

export function AsideMenuMain() {
  const intl = useIntl()

  return (
    <>
      <AsideMenuItem
        to='/dashboard'
        icon='/media/icons/duotone/Design/PenAndRuller.svg'
        title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
        fontIcon='bi-app-indicator'
      />

      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Work Orderss</span>
        </div>
      </div>
      <AsideMenuItem
        to='/statistics/service-quotes'
        icon='/media/icons/duotone/Design/PenAndRuller.svg'
        title='Service Quotes'
        fontIcon='bi-app-indicator'
      />
      <AsideMenuItem
        to='/statistics/sales-quotes'
        icon='/media/icons/duotone/Design/PenAndRuller.svg'
        title='Sales Quotes'
        fontIcon='bi-app-indicator'
      />
      <AsideMenuItem
        to='/statistics/sales-orders'
        icon='/media/icons/duotone/Design/PenAndRuller.svg'
        title='Sales Orders'
        fontIcon='bi-app-indicator'
      />
      <AsideMenuItem
        to='/statistics/service-orders'
        icon='/media/icons/duotone/Design/PenAndRuller.svg'
        title='Service Orders'
        fontIcon='bi-app-indicator'
      />
      <AsideMenuItem
        to='/statistics/calibration-reports'
        icon='/media/icons/duotone/Design/PenAndRuller.svg'
        title='Calibration Reports'
        fontIcon='bi-app-indicator'
      />
      

      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Profile</span>
        </div>
      </div>
      <AsideMenuItemWithSub
        to='/crafted/accounts'
        title='Accounts'
        icon='/media/icons/duotone/General/User.svg'
        fontIcon='bi-person'
      >
        <AsideMenuItem to='/crafted/account/overview' title='Overview' hasBullet={true} />
        <AsideMenuItem to='/crafted/account/settings' title='Settings' hasBullet={true} />
      </AsideMenuItemWithSub>

      <div className='menu-item'>
        <div className='menu-content'>
          <div className='separator mx-1 my-4'></div>
        </div>
      </div>
    </>
  )
}
