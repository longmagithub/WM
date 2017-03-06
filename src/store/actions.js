import * as types from './mutation-types'

export const setStatus = ({ commit }, data) => {
  commit(types.SET_STATUS, data)
}
