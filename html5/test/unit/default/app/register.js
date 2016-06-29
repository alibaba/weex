import chai from 'chai'
const { expect } = chai

import {
  registerComponent,
  requireComponent,
  registerModules,
  requireModule,
  getModule,
  clearModules,
  registerMethods
} from '../../../../default/app/register'

function Ctx () {
  this.customComponentMap = {}
}

describe('register', () => {
  let ctx

  before(() => {
    clearModules()

    Ctx.prototype.requireModule = requireModule
    Ctx.prototype.registerComponent = registerComponent
    Ctx.prototype.requireComponent = requireComponent
    Ctx.registerModules = registerModules
    Ctx.registerMethods = registerMethods

    ctx = new Ctx()
  })

  after(() => {
    clearModules()
  })

  describe('component', () => {
    it('with exports', () => {
      const exports = {
        a: 'b'
      }

      ctx.registerComponent('componentA', exports)
      expect(ctx.requireComponent('componentA')).to.deep.equal(exports)
    })

    it('with a existing name', () => {
      const exports = {
        a: 'b'
      }

      let err
      try {
        ctx.registerComponent('componentA', exports)
      }
      catch (e) {
        err = e
      }

      expect(err).to.be.a('Error')
    })
  })

  describe('module', () => {
    it('with a old format', () => {
      Ctx.registerModules({
        dom: [
          'createBody',
          'addElement'
        ]
      })

      expect(ctx.requireModule('dom'))
        .to.have.any.keys('createBody', 'addElement')
    })

    it('with a new format', () => {
      Ctx.registerModules({
        dom: [
          {
            name: 'moveElement',
            args: ['string', 'string']
          }
        ],
        stream: [
          {
            name: 'sendMtop',
            args: ['object', 'function']
          }
        ]
      })

      expect(ctx.requireModule('dom'))
        .to.have.all.keys('createBody', 'addElement', 'moveElement')
      expect(ctx.requireModule('stream')).to.have.all.keys('sendMtop')
    })

    it('with a existed module.method', () => {
      Ctx.registerModules({
        dom: [
          {
            name: 'moveElement',
            args: ['string', 'string', 'string']
          }
        ]
      }, true)

      Ctx.registerModules({
        stream: [
          {
            name: 'sendMtop',
            args: ['object']
          }
        ]
      })

      expect(getModule('dom').moveElement).to.deep.equal({
        name: 'moveElement',
        args: ['string', 'string', 'string']
      })

      expect(getModule('stream').sendMtop).to.deep.equal({
        name: 'sendMtop',
        args: ['object', 'function']
      })
    })
  })

  describe('api', () => {
    it('a common api', () => {
      Ctx.registerMethods({
        $test1: function () {
          return {
            ctx: this,
            value: 'test1'
          }
        },
        $test2: function () {
          return {
            ctx: this,
            value: 'test2'
          }
        }
      })

      expect(ctx.$test1).to.be.a('Function')
      expect(ctx.$test1()).to.deep.equal({
        ctx: ctx,
        value: 'test1'
      })
      expect(ctx.$test2).to.be.an('Function')
      expect(ctx.$test2()).to.deep.equal({
        ctx: ctx,
        value: 'test2'
      })
    })
  })
})
