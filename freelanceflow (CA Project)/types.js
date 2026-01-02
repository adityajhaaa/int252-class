/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string} token
 */

/**
 * @typedef {Object} Client
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string} [company]
 */

/**
 * @typedef {Object} Project
 * @property {string} id
 * @property {string} clientId
 * @property {string} name
 * @property {number} hourlyRate
 * @property {string} color
 * @property {string} currency
 */

/**
 * @typedef {Object} TimeEntry
 * @property {string} id
 * @property {string} projectId
 * @property {string} startTime  // ISO string
 * @property {string|null} endTime // ISO string or null if running
 * @property {string} description
 * @property {boolean} billable
 */

/**
 * @typedef {Object} AppState
 * @property {Client[]} clients
 * @property {Project[]} projects
 * @property {TimeEntry[]} timeEntries
 * @property {string|null} activeTimerId
 */

/**
 * @typedef {'Draft' | 'Sent' | 'Paid'} InvoiceStatus
 */

/**
 * @typedef {Object} InvoiceData
 * @property {string} clientId
 * @property {string} projectId
 * @property {string} startDate
 * @property {string} endDate
 * @property {number} totalHours
 * @property {number} totalAmount
 * @property {string} [summary]
 */
