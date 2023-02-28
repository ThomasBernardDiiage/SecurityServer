const local = 'http://localhost:4200/';

const account = {
  email: 'nr',
  password: '123',
};
const user = {
  email: 'prenomNom@test.fr',
  password: '123',
  firstname: 'prénom',
  lastname: 'nom',
  picture:
    'https://www.hominides.com/wp-content/uploads/2021/11/gorille-disparition-1024x735.jpg',
};

describe('Test creating new user spec', () => {
  it('Create new user', () => {
    cy.visit(local);
    cy.get('[formcontrolname="email"]').type(account.email);
    cy.get('[formcontrolname="password"]').type(account.password);
    cy.get('button').click();

    cy.get('[ng-reflect-router-link="user"]').click();
    cy.get('.header > .fa-solid').click();

    cy.get('[formcontrolname="email"]').type(user.email);
    cy.get('[formcontrolname="password"]').type(user.password);
    cy.get('[formcontrolname="firstname"]').type(user.firstname);
    cy.get('[formcontrolname="lastname"]').type(user.lastname);
    cy.get('[formcontrolname="picture"]').type(user.picture);
    cy.get('button').click();
  });
});
