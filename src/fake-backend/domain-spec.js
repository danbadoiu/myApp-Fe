/**
 * @typedef UserBE
 * @property {string} id
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} username
 * @property {string} email
 * @property {'DOCTOR'|'PATIENT'} role
 * @property {string} password
 * @property {string} profilePicture
 */

/**
 * @typedef MessageBE
 * @property {string} id
 * @property {string} idSender
 * @property {string} idReceiver
 * @property {Date} date

 */

/**
 * @typedef EmployeeDetailsBE
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} employeeId
 */

/**
 * @typedef TeamBE
 * @property {number | string} id
 * @property {string} name
 * @property {string} crtUsr
 * @property {string} crtTms
 * @property {string} mdfUsr
 * @property {string} mdfTms
 * @property {'ACTIVE'|'INACTIVE'} status
 */

/**
 * @typedef FreeDayBE
 * @property {string} name
 * @property {string} startDate
 * @property {string} endDate
 */

/**
 * @typedef HolidayBE
 * @property {string} employeeId
 * @property {string} startDate
 * @property {string} endDate
 * @property {'PENDING'|'APPROVED'|'REJECTED'} status
 * @property {'VACATION'|'MEDICAL'} type
 * @property {string} description
 * @property {string} rejectReason
 * @property {string} noOfDays
 * @property {number} v
 * @property {EmployeeDetailsBE} employeeDetails
 */

/**
 * @typedef LegallyDaysOffBE
 * @property {string} date
 * @property {string} description
 */
