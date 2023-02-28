const url = 'http://localhost:4200/';
const email = 'nr';
const password = '123';

describe('Test nr account spec', () => {
  it('Visists the web application', () => {
    cy.visit(url);
    cy.get('[formcontrolname="email"]').type(email);
    cy.get('[formcontrolname="password"]').type(password);
    cy.get('button').click();
    cy.url().should('eq', `${url}main`);
  });
});
