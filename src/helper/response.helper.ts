import {DEFAULT_ERROR_MESSAGE} from '../data/constants'

const getErrorMessage = (error: any) => {
  if (!error && !error.response) return DEFAULT_ERROR_MESSAGE
  const {status, data} = error.response
  if (status === 422) {
    const errors = Object.values(data.errors)
    const errMsg = errors.map((err: any) => err.join('\n')).join('\n')
    return errMsg
  }
  if (data.message) return data.message
  return DEFAULT_ERROR_MESSAGE
}

export {getErrorMessage}
