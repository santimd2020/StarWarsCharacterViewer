/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to wait for character to load
       * @example cy.waitForCharacter()
       */
      waitForCharacter(): Chainable<void>;
    }
  }
}

Cypress.Commands.add('waitForCharacter', () => {
  cy.get('[data-testid="loading-spinner"]', { timeout: 10000 }).should('not.exist');
  cy.get('[data-testid="character-card"]', { timeout: 10000 }).should('exist');
});

export {};



