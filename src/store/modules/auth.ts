export interface IAuthState {
  role: string;
}

export default {
  namespaced: true,
  state: (): IAuthState => {
    return {
      role: "",
    };
  },
  mutations: {
    setRole(state: IAuthState, role: string): void {
      state.role = role;
    },
  },
};
