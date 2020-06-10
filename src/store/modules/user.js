import { getCurrentUser, updateUser, getPerms } from '@/api/user'
import { login, logout, refresh } from '@/api/auth'
import wepy from '@wepy/core'
import * as auth from '@/utils/auth'
import isEmpty from 'lodash/isEmpty'
import { login, refresh } from '@/api/auth'

const getDefaultState = () => {
  return {
    user: auth.getUser(),
    accessToken: auth.getToken(),
    accessTokenExpiredAt: auth.getTokenExpiredAt(),
    perms:auth.getPerms()
  }
}

const state = getDefaultState()

// 定义 getters
const getters = {
  isLoggedIn: state => !isEmpty(state.accessToken),
  user: state => state.user,
  accessToken: state => state.accessToken,
  accessTokenExpiredAt: state => state.accessTokenExpiredAt,
  perms: state => state.perms
}

// 定义 actions
const actions = {
  async login ({ dispatch, commit }, params = {}) {
    const loginData = await wepy.wx.login()
    params.code = loginData.code

    const authResponse = await login(params)

    commit('setToken', authResponse.data)
    auth.setToken(authResponse.data)

    dispatch('getUser')
  },
  async getUser ({ dispatch, commit }) {
    const userResponse = await getCurrentUser()

    commit('setUser', userResponse.data)
    auth.setUser(userResponse.data)

    dispatch('getPerms')
  },
  async getPerms ({ commit }) {
    const permResponse = await getPerms()

    commit('setPerms', permResponse.data.data)
    auth.setPerms(permResponse.data.data)
  },
  async updateUser ({ commit }, params = {}) {

    const editResponse = await updateUser(params)

    commit('setUser', editResponse.data)
    auth.setUser(editResponse.data)
  },
  async refresh ({ dispatch, commit, state }, params = {}) {
    const refreshResponse = await refresh(state.accessToken, {}, false)

    commit('setToken', refreshResponse.data)
    auth.setToken(refreshResponse.data)

    dispatch('getUser')
  },
  async logout ({ commit, state }) {
    await logout(state.accessToken)

    // 清空 storage
    auth.logout()
    commit('resetState')
  }
}

// 定义 mutations
const mutations = {
  setUser(state, user) {
    state.user = user
  },
  setToken(state, tokenPayload) {
    state.accessToken = tokenPayload.access_token
    state.accessTokenExpiredAt = new Date().getTime() + tokenPayload.expires_in * 1000
  }
  resetState: (state) => {
    Object.assign(state, getDefaultState())
  }
  setPerms(state, perms) {
    state.perms = perms
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}