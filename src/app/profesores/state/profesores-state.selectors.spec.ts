import * as fromProfesoresState from './profesores-state.reducer';
import { selectProfesoresState } from './profesores-state.selectors';

describe('ProfesoresState Selectors', () => {
  it('should select the feature state', () => {
    const result = selectProfesoresState({
      [fromProfesoresState.profesoresStateFeatureKey]: {}
    });

    expect(result).toEqual(result);
  });
});
