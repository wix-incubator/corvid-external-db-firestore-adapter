const { expect } = require('chai')
const client = require('./firestore')

describe('Firestore Client', () => {

  describe('query', () => {
    it('throws an error', () => {
      //given

      //when
      const callable = client.query

      //then
      expect(callable).to.throw()
    })
  })

  describe('listCollectionIds', () => {
    it('throws an error', () => {
      //given

      //when
      const callable = client.listCollectionIds

      //then
      expect(callable).to.throw()
    })
  })

  describe('delete', () => {
    it('throws an error', () => {
      //given

      //when
      const callable = client.delete

      //then
      expect(callable).to.throw()
    })
  })

  describe('patch', () => {
    it('throws an error', () => {
      //given

      //when
      const callable = client.patch

      //then
      expect(callable).to.throw()
    })
  })
})
