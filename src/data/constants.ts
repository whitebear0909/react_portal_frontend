const USER_TYPES = {
  NBS: 'nbs',
  CUSTOMER: 'customer',
}

const CUSTOMER_LEVELS = {
  ADMIN: 'admin',
  APPROVER: 'approver',
  VIEWER: 'viewer',
}

const CUSTOMER_STATUS = {
  ACTIVE: 'active',
  INVITED: 'invited',
  INACTIVE: 'inactive',
}

const CUSTOMER_PHONE_TYPE = {
  WORK_CELL: 'work_cell',
  WORK_PHONE: 'work_phone',
  OTHER: 'other',
}

const NBS_ADMIN_LEVEL = {
  ADMIN: 'admin',
  TECHINICIAN: 'technician',
}

const DEFAULT_ERROR_MESSAGE = 'Something went wrong. Please try again later.'

export {
  USER_TYPES,
  CUSTOMER_PHONE_TYPE,
  CUSTOMER_LEVELS,
  DEFAULT_ERROR_MESSAGE,
  CUSTOMER_STATUS,
  NBS_ADMIN_LEVEL,
}
