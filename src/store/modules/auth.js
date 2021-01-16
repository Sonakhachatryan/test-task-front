import UserService from "@/services/UserService";
import * as types  from '@/store/mutation-types';

// state
export const state = {
    user: null,
    isAuthenticated: false
};

// getters
export const getters = {
    user: state => state.user,
    isAuthenticated: state => state.isAuthenticated
};

// mutations
export const mutations = {
    [types.SET_USER] : (state, data) => { state.user = data.user},
    [types.SET_IS_AUTHENTICATED] : (state, data) => { state.isAuthenticated = data}
};

// actions
export const actions = {
    async fetchUser({ commit }, user) {
        commit("SET_IS_AUTHENTICATED", user !== null);

        if (user) {
            user.additionalInfo = await (new UserService()).getUserData();
            commit("SET_USER", {user: user});
        } else {
            commit("SET_USER", {user: null});
        }
    }
}
