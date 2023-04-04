import * as fromAlumosState from './alumnos-state.reducer';
import { selectAlumosStateState } from './alumnos-state.selectors';

describe('AlumosState Selectors', () => {
  it('should select the feature state', () => {
    const result = selectAlumosStateState({
      [fromAlumosState.alumosStateFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
