import {USER_TYPES, CUSTOMER_LEVELS} from '../data/constants'

const isNBS = (type: string | undefined) => type === USER_TYPES.NBS

const isCustomerAdmin = (level: string | undefined) => level === CUSTOMER_LEVELS.ADMIN

export {isNBS, isCustomerAdmin}
