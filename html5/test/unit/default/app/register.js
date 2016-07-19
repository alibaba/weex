import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
const { expect } = chai
chai.use(sinonChai)

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
      const def = {
        a: 'b'
      }

      ctx.registerComponent('componentA', def)
      expect(ctx.requireComponent('componentA')).to.deep.equal(def)
    })

    it('with a existing name', () => {
      const def = {
        a: 'b'
      }
      sinon.stub(console, 'error')
      ctx.registerComponent('componentA', def)
      expect(console.error).callCount(1)
      console.error.restore()
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
