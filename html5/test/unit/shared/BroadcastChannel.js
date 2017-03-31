import { expect } from 'chai'
import sinon from 'sinon'

import service from '../../../services/broadcast-channel/index'
import { MessageEvent } from '../../../services/broadcast-channel/message-event'
const { BroadcastChannel } = service.create('foo').instance

describe('BroadcastChannel', () => {
  it('is a function', () => {
    expect(BroadcastChannel).is.an('function')
  })

  it('has standard APIs', () => {
    const JamesBond = new BroadcastChannel('007')
    expect(JamesBond.name).is.an('string')
    expect(JamesBond.onmessage).is.an('null')
    expect(JamesBond.postMessage).is.an('function')
    expect(JamesBond.close).is.an('function')

    expect(JamesBond).to.have.ownProperty('name')
    expect(JamesBond).to.have.ownProperty('onmessage')
    expect(JamesBond).not.to.have.ownProperty('postMessage')
    expect(JamesBond).not.to.have.ownProperty('close')
    JamesBond.close()
  })

  it.skip('inherit APIs', () => {
    const ProfessorX = new BroadcastChannel('Charles')
    expect(ProfessorX.addEventListener).is.an('function')
    expect(ProfessorX.removeEventListener).is.an('function')
    expect(ProfessorX.dispatchEvent).is.an('function')
  })

  it('name attribute is readonly', () => {
    const Wolverine = new BroadcastChannel('Logan')
    expect(Wolverine.name).to.equal('Logan')
    Wolverine.name = 'Wolverine'
    expect(Wolverine.name).to.equal('Logan')
    Wolverine.close()
  })

  describe('basci usage', () => {
    const Hulk = new BroadcastChannel('Avengers')
    const Stack = new BroadcastChannel('Avengers')
    const Steven = new BroadcastChannel('Avengers')
    const Logan = new BroadcastChannel('Mutants')
    const Erik = new BroadcastChannel('Mutants')

    beforeEach(() => {
      Hulk.onmessage = sinon.spy()
      Stack.onmessage = sinon.spy()
      Steven.onmessage = sinon.spy()
      Logan.onmessage = sinon.spy()
    })

    afterEach(() => {
      Hulk.onmessage = null
      Stack.onmessage = null
      Steven.onmessage = null
      Logan.onmessage = null
      Erik.onmessage = null
    })

    it('trigger onmessage', () => {
      Hulk.postMessage('Hulk Smash !!!')
      expect(Hulk.onmessage.callCount).to.be.equal(0)
      expect(Logan.onmessage.callCount).to.be.equal(0)
      expect(Stack.onmessage.callCount).to.be.equal(1)
      expect(Steven.onmessage.callCount).to.be.equal(1)
    })

    it('don\'t trigger onmessage itself', () => {
      Logan.postMessage('Any one here ?')
      expect(Hulk.onmessage.callCount).to.be.equal(0)
      expect(Logan.onmessage.callCount).to.be.equal(0)
      expect(Stack.onmessage.callCount).to.be.equal(0)
      expect(Steven.onmessage.callCount).to.be.equal(0)
    })

    it('send multi messages', () => {
      Hulk.postMessage('Hulk Smash !!!')
      Logan.postMessage('I will fight you !')
      Stack.postMessage('whatever')
      Hulk.postMessage('whatever')
      Stack.postMessage('whatever')
      Steven.postMessage('whatever')
      Stack.postMessage('whatever')

      expect(Hulk.onmessage.callCount).to.be.equal(4)
      expect(Logan.onmessage.callCount).to.be.equal(0)
      expect(Stack.onmessage.callCount).to.be.equal(3)
      expect(Steven.onmessage.callCount).to.be.equal(5)
    })

    it('send string message', () => {
      Stack.postMessage('I am Iron-Man.')

      expect(Hulk.onmessage.callCount).to.be.equal(1)
      expect(Steven.onmessage.callCount).to.be.equal(1)

      const event = Hulk.onmessage.firstCall.args[0]
      expect(event).is.an('object')
      expect(event.data).is.a('string')
      expect(event.data).to.be.equal('I am Iron-Man.')
    })

    it('send object message', () => {
      const message = {
        type: 'SOKOVIA ACCORDS',
        approvedCountry: 117,
        content: 'The Avengers shall no longer be a private organization.'
      }

      Stack.postMessage(message)

      const event = Steven.onmessage.firstCall.args[0]
      expect(event).is.an('object')
      expect(event.data).is.a('object')
      expect(event.data).to.deep.equal(message)
    })

    it('close channel', () => {
      Hulk.close()

      Steven.postMessage('come to fight !')
      expect(Hulk.onmessage.callCount).to.be.equal(0)
      expect(Stack.onmessage.callCount).to.be.equal(1)
      expect(Steven.onmessage.callCount).to.be.equal(0)
    })

    it('send message after close', () => {
      Hulk.close()

      expect(() => { Hulk.postMessage('I am leaving.') }).to.throw(Error)

      expect(Hulk.onmessage.callCount).to.be.equal(0)
      expect(Logan.onmessage.callCount).to.be.equal(0)
      expect(Stack.onmessage.callCount).to.be.equal(0)
      expect(Steven.onmessage.callCount).to.be.equal(0)
    })

    it('MessageEvent dafault parameters', () => {
      const event = new MessageEvent()

      expect(event).is.an('object')
      expect(event.data).to.be.null
      expect(event.type).to.be.equal('message')
      expect(event.origin).to.be.equal('')
      expect(event.target).to.be.null
      expect(event.source).to.be.null
      expect(event.timeStamp).to.be.a('number')
      expect(event.ports).to.be.an('array')
    })

    it('MessageEvent constructor', () => {
      const source = { type: 'empty' }
      const event = new MessageEvent('custom', {
        source,
        data: 'Nothing',
        origin: 'http://127.0.0.1',
        ports: ['8080']
      })

      expect(event).is.an('object')
      expect(event.data).to.be.equal('Nothing')
      expect(event.type).to.be.equal('custom')
      expect(event.origin).to.be.equal('http://127.0.0.1')
      expect(event.target).to.be.null
      expect(event.source).to.deep.equal(source)
      expect(event.timeStamp).to.be.a('number')
      expect(event.ports).to.deep.equal(['8080'])
    })

    it('use MessageEvent', () => {
      Steven.postMessage('Be Together.')

      const event = Stack.onmessage.firstCall.args[0]
      expect(event).is.an('object')
      expect(event.data).to.be.equal('Be Together.')
      expect(event.type).to.be.equal('message')
      expect(event.origin).to.be.equal('')
      expect(event.target).to.be.null
      expect(event.timeStamp).to.be.a('number')
    })

    it('invalid usage', () => {
      const stranger = {
        name: 'stranger',
        close: Erik.close,
        postMessage: Erik.postMessage
      }

      stranger.postMessage('hello world.')

      expect(Hulk.onmessage.callCount).to.be.equal(0)
      expect(Logan.onmessage.callCount).to.be.equal(0)
      expect(Stack.onmessage.callCount).to.be.equal(0)
      expect(Steven.onmessage.callCount).to.be.equal(0)

      stranger.close()
    })

    it('close all', () => {
      Hulk.close()
      Stack.close()
      Steven.close()
      Logan.close()
      Erik.close()

      // close again
      expect(() => {
        Hulk.close()
        Stack.close()
        Steven.close()
        Logan.close()
        Erik.close()
      }).to.not.throw
    })
  })
})
