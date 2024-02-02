const https = require('https')
const http = require('http')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const models = require('../models')

class Utility {
  // eslint-disable-next-line default-param-last
  static successRes(message = '', data) {
    return {
      status: 'success',
      message,
      data,
    }
  }

  static errorRes(message, errorStatus = 'error') {
    return { status: errorStatus, message }
  }

  static conflictRes(message, errorStatus = 'conflict') {
    return { status: errorStatus, message }
  }

  static getUrlRequest(url) {
    let data
    return new Promise((res) => {
      https.get(url, (resp) => {
        resp.on('data', (chunk) => {
          if (chunk !== undefined) data += chunk
        })
        resp.on('end', () => {
          res(data)
        })
      })
    })
  }




  static capitalizeString(str) {
    if (!str) return null
    const trimmedStr = str.trim()
    const normalizedStr = trimmedStr.replace(/\s{2,}/g, ' ')
    const words = normalizedStr.split(' ')
    const capitalizedWords = words.map((word) => {
      const firstLetter = word.charAt(0).toUpperCase()
      const restOfWord = word.slice(1).toLowerCase()
      return firstLetter + restOfWord
    })
    return capitalizedWords.join(' ')
  }

  static randomName(bytes = 32) {
    return crypto.randomBytes(bytes).toString('hex')
  }

  static getIP() {
    return new Promise((resolve, _reject) => {
      http.get({ host: 'api.ipify.org', port: 80, path: '/' }, (resp) => {
        resp.on('data', (ip) => {
          resolve(ip.toString())
        })
      })
    })
  }

  static saltRounds() {
    return Math.round(Math.random() * 10)
  }

  static hashPassword(password) {
    const saltRounds = this.saltRounds()
    return bcrypt.hashSync(password, saltRounds)
  }



  static validateRating(rating) {
    const result = parseInt(rating, 10)
    const MIN_RATING = 0
    const MAX_RATING = 5
    return (result >= MIN_RATING && result <= MAX_RATING) ? result : null
  }

  static validateEmail(email) {
    if (!email) return ''
    const regex = /^([a-z\d.-]+)@([a-z\d-]+)\.([a-z]{2,12})(\.[a-z]{2,12})?$/
    return regex.test(email.toLowerCase()) ? email.toLowerCase : ''
  }

  static validateMobile(mobile) {
    const regex = /^[0-9]{10}$/ // it is not country specific.
    return regex.test(mobile) ? mobile : ''
  }

}

module.exports = Utility
