import React from 'react';
import { mount } from '@cypress/react';

import { TodosComponent } from './todos';

describe('Todos Component', () => {
  let props = {};

  beforeEach(() => {
    props = {
      todos: [{ title: 'Test 1'}, { title: 'Test 2'}, { title: 'Test 3'}],
      fetchTodos: cy.stub(),
    };
    mount(<TodosComponent {...props} />);
  });
  
  it('should shows example todos', () => {
    cy.get('#todos').children().should('have.length', 3)
    cy.get('#todos').children().each((child, index) => {
      cy.wrap(child.title).contains(`Test ${index + 1}`)
    })
  });
  
  it('called fetch todos', async () => {
    cy.get('#fetchTodos').click().then(() => {
      expect(props.fetchTodos).to.have.been.called;
    })
  });
});
