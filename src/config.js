// Base URL
// export const baseUrl = 'http://iot-ca2.azurewebsites.net'
export const baseUrl = ''

// Dashboard Routes
export const countFalseAlarms = baseUrl + '/api/stats/falseAlarms'
export const countTriggered = baseUrl + '/api/stats/triggered'

// Criminal Routes
export const criminalsUrl = baseUrl + '/api/criminals/'

// Sound Threshold Preferences Routes
export const preferencesUrl = baseUrl + '/api/preferences/soundThreshold/'

// Offences Routes
export const offencesUrl = baseUrl + '/api/offences/'
export const offencesOptionsUrl = baseUrl + '/api/offences/options'

// Records of Cases
export const newCasesUrl = baseUrl + '/api/cases/newCases/'
export const pendingCasesUrl = baseUrl + '/api/cases/pendingCases/'
export const caseArchiveUrl = baseUrl + '/api/cases/archivedCases/'
export const casesUrl = baseUrl + '/api/cases/'
export const respondCase =  '/respondCase'
export const falseAlarm = '/falseAlarm'
export const resolveCase = '/resolveCase'