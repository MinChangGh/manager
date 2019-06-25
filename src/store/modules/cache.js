const cache = {
    state: {
        visitedViews: [],
        cachedViews: []
    },
    mutations: {
        ADD_CACHED_VIEWS: (state, view) => {
            if (state.cachedViews.some(v => v.name === view.name)) return
            if (view.meta.cache) {
                let item = {
                    name: view.name,
                    param: view.params,
                    query: view.query
                };
                state.cachedViews.push(item)
            }
        },
        DEL_CACHED_VIEWS: (state, view) => {
            for (const v of state.cachedViews) {
                if (v.name === view.name) {
                    const index = state.cachedViews.indexOf(v)
                    state.cachedViews.splice(index, 1)
                    break
                }
            }
        },
        DEL_OTHER_CACHED_VIEWS: (state, view) => {
            for (const v of state.cachedViews) {
                if (v.name === view.name) {
                    const index = state.cachedViews.indexOf(v)
                    state.cachedViews = state.cachedViews.slice(index, index + 1)
                    break
                }
            }
        },
        DEL_ALL_CACHED_VIEWS: (state) => {
            state.visitedViews = []
        },
        ADD_VISITED_VIEWS: (state, view) => {
            if (state.visitedViews.some(v => v.fullPath === view.fullPath)) return
            state.visitedViews.push({
                name: view.name,
                path: view.path,
                title: view.meta.title || 'no-name',
                fullPath: view.fullPath,
                params: view.params,
                query: view.query
            })
        },
        DEL_VISITED_VIEWS: (state, view) => {
            for (const [i, v] of state.visitedViews.entries()) {
                if (v.fullPath === view.fullPath) {
                    state.visitedViews.splice(i, 1)
                    break
                }
            }
        },
        DEL_OTHER_VISITED_VIEWS: (state, view) => {
            for (const [i, v] of state.visitedViews.entries()) {
                if (v.fullPath === view.fullPath) {
                    state.visitedViews = state.visitedViews.slice(i, i + 1)
                    break
                }
            }
        },
        DEL_ALL_VISITED_VIEWS: (state) => {
            state.visitedViews = []
        }
    },
    actions: {
        addVisitedViews({ commit }, view) {
            commit('ADD_VISITED_VIEWS', view)
        },
        delVisitedViews({ commit, state }, view) {
            return new Promise((resolve) => {
                commit('DEL_VISITED_VIEWS', view)
                resolve([...state.visitedViews])
            })
        },
        delOtherVisitedViews({ commit, state }, view) {
            return new Promise((resolve) => {
                commit('DEL_OTHER_VISITED_VIEWS', view)
                resolve([...state.visitedViews])
            })
        },
        delAllVisitedViews({ commit, state }) {
            return new Promise((resolve) => {
                commit('DEL_ALL_VISITED_VIEWS')
                resolve([...state.visitedViews])
            })
        },
        addCachedViews({ commit }, view) {
            commit('ADD_CACHED_VIEWS', view)
        },
        delCachedViews({ commit, state }, view) {
            return new Promise((resolve) => {
                commit('DEL_CACHED_VIEWS', view)
                resolve([...state.visitedViews])
            })
        },
        delOtherCachedViews({ commit, state }, view) {
            return new Promise((resolve) => {
                commit('DEL_OTHER_CACHED_VIEWS', view)
                resolve([...state.visitedViews])
            })
        },
        delAllCachedViews({ commit, state }) {
            return new Promise((resolve) => {
                commit('DEL_ALL_CACHED_VIEWS')
                resolve([...state.visitedViews])
            })
        }
    }
}

export default cache
