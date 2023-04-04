import * as fromUsuariosState from './usuarios-state.reducer';
import { selectUsuariosStateState } from './usuarios-state.selectors';

describe('UsuariosState Selectors', () => {
  it('should select the feature state', () => {
    const result = selectUsuariosStateState({
      [fromUsuariosState.usuariosStateFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
