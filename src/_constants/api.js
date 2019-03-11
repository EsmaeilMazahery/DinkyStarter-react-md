export const BACKEND = `${process.env.REACT_APP_MAIN_API_URL}api/`
export const SERVERFILE = `${process.env.REACT_APP_SERVERFILE_API_URL}`

const AUTH = `${BACKEND}auth/`
export const LOGIN = `${AUTH}login`
export const REGISTER = `${AUTH}register`
export const FORGETPASSWORD = `${AUTH}forgetpassword`

export const NOTIFICATIONS = `${process.env.REACT_APP_MAIN_API_URL}notifications`

const BASEINFO = `${BACKEND}baseinfo/`
export const COMPANYINFO = `${BASEINFO}companyInfo`

export const REGIONS=`${BACKEND}region`
export const REGISTER_REGION=REGIONS
export const DELETE_REGION = REGIONS
export const UPDATE_REGION = regionId => `${REGIONS}/${regionId}`
export const GET_REGION = regionId => `${REGIONS}/${regionId}`
export const REGIONSFILTER =`${REGIONS}/filter`  

export const CITIES=`${BACKEND}city`
export const REGISTER_CITY=CITIES
export const DELETE_CITY = CITIES
export const UPDATE_CITY = cityId => `${CITIES}/${cityId}`
export const GET_CITY = cityId => `${CITIES}/${cityId}`
export const CITIESFILTER =`${CITIES}/filter`  

export const RESELLERS=`${BACKEND}reseller`
export const REGISTER_RESELLER=RESELLERS
export const DELETE_RESELLER = RESELLERS
export const UPDATE_RESELLER = resellerId => `${RESELLERS}/${resellerId}`
export const GET_RESELLER = resellerId => `${RESELLERS}/${resellerId}`
export const RESELLERSFILTER =`${RESELLERS}/filter`  

export const ACCOUNTINGS=`${BACKEND}accounting`
export const REGISTER_ACCOUNTING=ACCOUNTINGS
export const DELETE_ACCOUNTING = ACCOUNTINGS
export const UPDATE_ACCOUNTING = accountingId => `${ACCOUNTINGS}/${accountingId}`
export const GET_ACCOUNTING = accountingId => `${ACCOUNTINGS}/${accountingId}`
export const ACCOUNTINGSFILTER =`${ACCOUNTINGS}/filter`  


export const FILEUPLOAD= folder => `${SERVERFILE}/File/Upload/${folder}`
export const FILEEXISTS= filename => `${SERVERFILE}/File/Exists/${filename}`
export const FILEDELETE= filename => `${SERVERFILE}/File/Delete/${filename}`
export const FILEBASE64= filename => `${SERVERFILE}/File/Base64/${filename}`
export const FILEDOWNLOAD= filename => `${SERVERFILE}/Files/${filename}`





export const STORIES = `${BACKEND}stories/`
export const CREATE_STORY = STORIES
export const DELETE_STORY = STORIES
export const UPDATE_STORY = storyId => `${STORIES}${storyId}`
export const PUBLISH_STORY = storyId => `${STORIES}${storyId}/publish`

export const USER_STORIES = userId => `${STORIES}user/${userId}`
export const STORY_DETAIL = storyId => `${STORIES}${storyId}`
export const DRAFTS = `${STORIES}drafts`
export const SHARED = `${STORIES}shared`
export const TOGGLE_LIKE = storyId => `${STORIES}${storyId}/toggleLike`
export const SHARE = storyId => `${STORIES}${storyId}/share`

