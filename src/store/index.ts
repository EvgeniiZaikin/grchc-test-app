import { createStore } from "vuex";

import AuthStore, { type IAuthState } from "@/store/modules/auth";

interface IStore {
  auth: IAuthState;
}

const store = createStore<IStore>({
  modules: {
    auth: AuthStore,
  },
});

export default store;
