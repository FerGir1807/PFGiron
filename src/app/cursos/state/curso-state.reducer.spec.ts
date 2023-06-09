import { cursoReducer, initialState } from './curso-state.reducer';

describe('CursoState Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = cursoReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
