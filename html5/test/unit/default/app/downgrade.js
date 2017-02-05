import chai from 'chai'
const { expect } = chai

import * as Downgrade from '../../../../frameworks/legacy/app/downgrade'

describe('downgrade', () => {
  describe('normalizeVersion', () => {
    it('should be normalize version format', () => {
      const cases = [
        ['', '0.0.0'],
        ['1', '1.0.0'],
        ['1.0', '1.0.0'],
        ['1.0.0', '1.0.0'],
        ['1.0.0.0', '1.0.0'],
        ['1.3.4.1230', '1.3.4']
      ]

      cases.map(function (item, index) {
        const input = item[0]
        const should = item[1]
        const test = Downgrade.normalizeVersion(input)

        expect(test).to.be.equal(should)
      })
    })

    it('invalid version format', () => {
      expect(Downgrade.normalizeVersion([])).to.be.equal('0.0.0')
      expect(Downgrade.normalizeVersion({})).to.be.equal('0.0.0')
      expect(Downgrade.normalizeVersion(2.0)).to.be.equal('0.0.0')
    })
  })

  describe('getError', () => {
    it('should be get right error message', () => {
      const cases = [
        [1000, 'osName', 'iphone', 'iphone'],
        [1001, 'osVersion', '1.0.0', '1.0.0'],
        [1002, 'appVersion', '3.2.2', '>3.0.0'],
        [1003, 'weexVersion', '1.2.3', '>=1.2.3'],
        [1004, 'deviceModel', '1.0.0', ['1.0.0']]
      ]

      cases.map(function (item, index) {
        const code = item[0]
        const key = item[1]
        const val = item[2]
        const criteria = item[3]
        const test = Downgrade.getError(key, val, criteria)

        expect(test.code).to.be.equal(code)
        expect(test.errorType).to.be.equal(1)
        expect(test.isDowngrade).to.be.equal(true)
      })
    })
  })

  describe('check', () => {
    it('should be match config', () => {
      const deviceInfo = {
        platform: 'ios',
        osVersion: '9.2.1',
        appVersion: '5.4.0',
        weexVersion: '1.3.0',
        deviceModel: 'iPhone6.2'
      }

      const cases = [
        [{ ios: { osVersion: '>=9' }}, true],
        [{ ios: { appVersion: '<10.0.0' }}, true],
        [{ ios: { appVersion: '>10.0.0' }}, false],
        [{ ios: { appVersion: '5.4.0' }}, true],
        [{ ios: { deviceModel: 'ABC' }}, false],
        [{ ios: { deviceModel: 'iPhone6.2' }}, true],
        [{ ios: { deviceModel: ['iPhone6.2', 'ABC'] }}, true],
        [{ ios: { osVersion: '>9', deviceModel: ['iPhone6.2', 'ABC'] }}, true],
        [{ ios: { osVersion: '>=9', deviceModel: ['iPhone6.2', 'ABC'] }}, true],
        [{ ios: { weexVersion: '<=9' }}, true]
      ]

      cases.map(function (item, index) {
        const criteria = item[0]
        const should = item[1]
        const test = Downgrade.check(criteria, deviceInfo)

        expect(test.isDowngrade).to.be.equal(should)
      })
    })

    it('should be match config without app version', () => {
      const deviceInfo = {
        platform: 'iOS',
        osVersion: '9.2',
        weexVersion: '1.3.0',
        deviceModel: 'iPhone6.2'
      }

      const cases = [
        [{ ios: { osVersion: '>=9' }}, true],
        [{ ios: { osVersion: '>8' }}, true],
        [{ ios: { appVersion: '<10.0.0' }}, false],
        [{ ios: { appVersion: '>10.0.0' }}, false],
        [{ ios: { appVersion: '5.4.0' }}, false],
        [{ ios: { deviceModel: 'ABC' }}, false],
        [{ ios: { deviceModel: 'iPhone6.2' }}, true],
        [{ ios: { deviceModel: ['MF353TA/A', 'ABC'] }}, false],
        [{ ios: { osVersion: '>9', deviceModel: ['MF353TA/A', 'ABC'] }}, true],
        [{ ios: { osVersion: '>=9', deviceModel: ['MF353TA/A', 'ABC'] }}, true],
        [{ ios: { weexVersion: '<=9' }}, true],
        [{ ios: { weexVersion: '>=1.3.0' }}, true],
        [{ ios: { weexVersion: '>=1.3.0' }}, true]
      ]

      cases.map(function (item, index) {
        const criteria = item[0]
        const should = item[1]
        const test = Downgrade.check(criteria, deviceInfo)

        expect(test.isDowngrade).to.be.equal(should)
      })
    })

    it('should be match config and deviceInfo from global var', () => {
      global.WXEnvironment = {
        platform: 'iOS',
        osVersion: '9.2',
        appVersion: '5.4.0',
        weexVersion: '1.3.0',
        deviceModel: 'iPhone6.2'
      }

      const cases = [
        [{ ios: { osVersion: '>=9' }}, true],
        [{ ios: { osVersion: '>8' }}, true],
        [{ ios: { appVersion: '<10.0.0' }}, true],
        [{ ios: { appVersion: '>10.0.0' }}, false],
        [{ ios: { appVersion: '5.4.0' }}, true],
        [{ ios: { deviceModel: 'ABC' }}, false],
        [{ ios: { deviceModel: 'iPhone6.2' }}, true],
        [{ ios: { deviceModel: ['MF353TA/A', 'ABC'] }}, false],
        [{ ios: { osVersion: '>9', deviceModel: ['MF353TA/A', 'ABC'] }}, true],
        [{ ios: { osVersion: '>=9', deviceModel: ['MF353TA/A', 'ABC'] }}, true],
        [{ ios: { weexVersion: '<=9' }}, true],
        [{ ios: { weexVersion: '>=1.3.0' }}, true],
        [{ ios: { weexVersion: '>=1.3.0' }}, true]
      ]

      cases.map(function (item, index) {
        const criteria = item[0]
        const should = item[1]
        const test = Downgrade.check(criteria)

        expect(test.isDowngrade).to.be.equal(should)
      })
    })

    it('should be using using custom check', () => {
      const deviceInfo = {
        platform: 'iOS',
        osVersion: '9.2',
        appVersion: '5.4.0',
        weexVersion: '1.3.0',
        deviceModel: 'iPhone6.2'
      }

      const cases = [
        [
          function () {

          }, false
        ],
        [
          function () {
            return true
          }, true
        ],
        [
          function () {
            return false
          }, false
        ],
        [
          function (deviceInfo) {
            if (deviceInfo.platform === 'iOS') {
              return true
            }
            return false
          }, true
        ],
        [
          function (deviceInfo, tools) {
            if (deviceInfo.osVersion === '9.2') {
              return true
            }
            return false
          }, true
        ],
        [
          function (deviceInfo, tools) {
            if (tools.normalizeVersion(deviceInfo.osVersion) === '9.2.0') {
              return true
            }
            return false
          }, true
        ],
        [
          function (deviceInfo, tools) {
            return tools.semver.satisfies(tools.normalizeVersion(deviceInfo.osVersion), '9.2.0')
          }, true
        ],
        [
          function (deviceInfo, tools) {
            return tools.semver.satisfies(deviceInfo.appVersion, '5.4.0')
          }, true
        ],
        [
          function (deviceInfo, tools) {
            return tools.semver.satisfies(deviceInfo.weexVersion, '1.3.0')
          }, true
        ],
        [
          function (deviceInfo, tools) {
            return deviceInfo.deviceModel === 'iPhone6.2'
          }, true
        ],
        [
          function (deviceInfo, tools) {
            return deviceInfo.deviceModel === 'AndroidPad'
          }, false
        ],
        [
          function (deviceInfo, tools) {
            return ['iPhone6.2', 'iPhone7.1'].indexOf(deviceInfo.deviceModel) >= 0
          }, true
        ]
      ]

      cases.map(function (item, index) {
        const criteria = item[0]
        const should = item[1]
        const test = Downgrade.check(criteria, deviceInfo)

        expect(test.isDowngrade).to.be.equal(should)
      })
    })
  })
})
