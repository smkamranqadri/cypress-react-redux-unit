import React from 'react';
import { mount } from '@cypress/react';

import { CounterComponent } from './counter';

describe('Counter Component', () => {
  let props = {};

  beforeEach(() => {
    props = {
      count: 10,
      increment: cy.stub(),
      decrement: cy.stub(),
    };
    mount(<CounterComponent {...props} />);
  });
  
  it('shows count value 10', () => {
    cy.get('#count').contains(10);
  });
  
  it('increase the count', () => {
    cy.get('#increment').click().then(() => {
      expect(props.increment).to.have.been.called;
    })
  });
  
  it('decrease the count', () => {
    cy.get('#decrement').click().then(() => {
      expect(props.decrement).to.have.been.called;
    })
  });
});
