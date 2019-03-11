import _ from 'lodash'

export const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const MOBILE_REGEX = /^[0-9]11$/

export const WEBSITE_REGEX = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/

export const minLength = min => value =>
  value && value.length < min ? `Length should be more than ${min}` : undefined

export const required = (
  name,
  message = `${name} اجباری است`
) => n => (n ? undefined : message)

export const moreThan = (
  limit,
  message = `Should be more than ${limit}`
) => n => (n > limit ? undefined : message)

export const lessThan = (
  limit,
  message = `Should be less than ${limit}`
) => n => (n < limit ? undefined : message)

export const integer = n =>
  n.toString().includes('.') ? 'Should be integer' : undefined

export const lengthMoreThan = (
  limit,
  message = `نمی تواند بیشتر از ${limit} کاراکتر باشد`
) => str => (!str || str.length < limit ? message : undefined)

export const lengthLessThan = (
  limit,
  message = `نمی تواند کمتر از ${limit} کاراکتر باشد`
) => str => (!str || str.length > limit ? message : undefined)

export const email = value =>
  !value || !EMAIL_REGEX.test(value) ? 'ایمیل اشتباه است' : undefined

export const uniqueAmong = (values, message = 'Should be unique') => v =>
  v && _.includes(values, v) ? message : undefined

export const website = value =>
  value && !WEBSITE_REGEX.test(value) ? 'Invalid website' : undefined

export const mobile = value =>
  !value || !MOBILE_REGEX.test(value) ? 'موبایل اشتباه است' : undefined