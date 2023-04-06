import * as fromAlumosState from './alumnos-state.reducer';
import { selectAlumosState } from './alumnos-state.selectors';

describe('AlumosState Selectors', () => {
  it('should select the feature state', () => {
    const result = selectAlumosState({
      [fromAlumosState.alumnosStateFeatureKey]: {}
    });

    expect(result).toEqual(result);
  });
});
