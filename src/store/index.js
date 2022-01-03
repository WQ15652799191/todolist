import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [],
    inputValue: '',
    nextId: 5,
    viewKey: 'all'
  },
  mutations: {
    initList (state, list) {
      state.list = list
    },
    setInputValue (state, val) {
      state.inputValue = val
    },
    addItem (state) {
      const obj = {
        id: state.nextId,
        info: state.inputValue.trim(),
        done: false
      }
      state.list.push(obj)
      state.nextId++
      state.inputValue = ''
      window.localStorage.setItem('listdata', JSON.stringify(state))
    },
    removeItem (state, id) {
      const i = state.list.findIndex(x => x.id === id)
      if (i !== -1) {
        state.list.splice(i, 1)
      }
      window.localStorage.setItem('listdata', JSON.stringify(state))
    },
    changeStatus (state, param) {
      const i = state.list.findIndex(x => x.id === param.id)
      if (i !== -1) {
        state.list[i].done = param.status
      }
      window.localStorage.setItem('listdata', JSON.stringify(state))
    },
    cleanDone (state) {
      state.list = state.list.filter(x => x.done === false)
      window.localStorage.setItem('listdata', JSON.stringify(state))
    },
    changeViewKey (state, str) {
      state.viewKey = str
      window.localStorage.setItem('listdata', JSON.stringify(state))
    }
  },
  actions: {
    getList (context) {
      const data = JSON.parse(window.localStorage.getItem('listdata')).list || []
      context.commit('initList', data)
    }
  },
  getters: {
    unDoneLength (state) {
      return state.list.filter(x => x.done === false).length
    },
    infoList (state) {
      if (state.viewKey === 'all') {
        return state.list
      }
      if (state.viewKey === 'doing') {
        return state.list.filter(x => !x.done)
      }
      if (state.viewKey === 'done') {
        return state.list.filter(x => x.done)
      }
      return state.list
    }
  },
  modules: {
  }
})
