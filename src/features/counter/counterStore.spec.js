import {
  counterStore,
  increment,
  incrementByAmount,
  decrement,
} from './counterStore';

describe('Counter Store', () => {
  describe('Counter Store Actions', () => {
    it('should test increment by amount action.', () => {
      const actionReturnValue = incrementByAmount(100);
      expect(actionReturnValue.type).to.equal('counter/incrementByAmount');
      expect(actionReturnValue.payload).to.equal(100);
    });

    it('should test increment action.', () => {
      const actionReturnValue = increment();
      expect(actionReturnValue.type).to.equal('counter/increment');
    });

    it('should test decrement action.', () => {
      const actionReturnValue = decrement();
      expect(actionReturnValue.type).to.equal('counter/decrement');
    });
  });

  describe('Counter Store Reducer', () => {
    const initialState = {
      value: 0,
    };
    it('should return initial state', () => {
      const reducerReturnValue = counterStore.reducer(undefined, {});
      expect(reducerReturnValue).to.deep.equal(initialState);
    });

    it('should return incremental state', () => {
      const type = 'counter/increment';
      const action = { type };
      const reducerReturnValue = counterStore.reducer(initialState, action);
      expect(reducerReturnValue.value).to.equal(1);
    });

    it('should return decrement state', () => {
      const type = 'counter/decrement';
      const action = { type };
      const reducerReturnValue = counterStore.reducer(initialState, action);
      expect(reducerReturnValue.value).to.equal(-1);
    });
  });
});
