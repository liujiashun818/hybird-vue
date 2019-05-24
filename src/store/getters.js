export default {
    getDate: (state, date) => {
        return date.slice(0, -2) + ':00'
    },

    wakeData: (state) => {
        return state.wakeData
    },

    showPage: (state) => {
        return state.showPage
    }
}