import appleGET from './testData/appleGET.json'
import dffGET from './testData/dffGET.json'

describe('empty spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('Should have a form where a word can be entered and submitted to return a definition.', () => {
    cy.intercept('GET', 'https://api.dictionaryapi.dev/api/v2/entries/en/apple', {
      statusCode: 200,
      body: appleGET
    })
    .get('form')
    .contains('WORD')
    .get('input[type="text"]')
    .type('apple')
    .get('input[type="submit"]').click()
    .get('h1')
    .contains('apple')
    .get('h2')
    .contains('Definitions')
  })

  it('Should display error message if no word is found.', () => {
    cy.intercept('GET', 'https://api.dictionaryapi.dev/api/v2/entries/en/dff', {
      statusCode: 404,
      body: dffGET
    })
    .get('form')
    .contains('WORD')
    .get('input[type="text"]')
    .type('dff')
    .get('input[type="submit"]').click()
    .get('main')
    .contains('Sorry pal, we couldn\'t find definitions for the word you were looking for.')
  })

})