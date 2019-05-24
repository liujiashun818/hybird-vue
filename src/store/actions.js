import {
    GET_DATE, SAVE_DATA, SET_SHOW_PAGE
} from './types'

export default {
    getDate ({commit}, date) {
        commit(GET_DATE, date)
    },

    saveData ({commit}, data) {
        commit(SAVE_DATA, data)
    },

    setShowPage ({commit}, data) {
        commit(SET_SHOW_PAGE, data)
    }
}
