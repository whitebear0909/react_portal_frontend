import {CUSTOMER_PHONE_TYPE} from '../data/constants'
import {UserModel} from '../types'

const getPrimaryPhone = (user: UserModel) => {
  if (!user?.primaryPhone) return ''

  switch (user.primaryPhone) {
    case CUSTOMER_PHONE_TYPE.WORK_CELL:
      return user?.workCell
    case CUSTOMER_PHONE_TYPE.WORK_PHONE:
      return user?.workPhone
    case CUSTOMER_PHONE_TYPE.OTHER:
      return user?.other
  }
}

export {getPrimaryPhone}
