export interface IAuthState {
  role: string | null;
}

export default {
  namespaced: true,
  state: (): IAuthState => {
    return {
      role: null,
    };
  },
  mutations: {
    setRole(state: IAuthState, role: string): void {
      state.role = role;
    },
  },
};
