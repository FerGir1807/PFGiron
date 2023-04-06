import { alumnoReducer, initialState } from './alumnos-state.reducer';

describe('AlumosState Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = alumnoReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
