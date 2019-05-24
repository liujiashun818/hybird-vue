import {
    GET_DATE, SAVE_DATA, SET_SHOW_PAGE
} from './types';

export default {
    [GET_DATE]:(state, date) => {
        return date.slice(0, -2) + ':00'
    },

    [SAVE_DATA] (state, data) {
        state.wakeData = data
    },

    [SET_SHOW_PAGE] (state, data) {
        state.showPage = data
    }
}
