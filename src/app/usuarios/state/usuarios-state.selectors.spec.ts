import * as fromUsuariosState from './usuarios-state.reducer';
import { selectUsuariosState } from './usuarios-state.selectors';

describe('UsuariosState Selectors', () => {
  it('should select the feature state', () => {
    const result = selectUsuariosState({
      [fromUsuariosState.usuariosStateFeatureKey]: {}
    });

    expect(result).toEqual(result);
  });
});
