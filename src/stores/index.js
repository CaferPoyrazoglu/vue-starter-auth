// noinspection JSCheckFunctionSignatures

import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isAuthenticated: false,
        userRole: null,
    }),
    persist: {
        enabled: true,
        strategies: [
            {
                key: 'user',
                storage: localStorage,
            },
        ],
    },
    getters: {
        isUserAuthenticated: (state) => state.isAuthenticated,
        isAdmin: (state) => state.userRole === 'ADMIN',
        isUser: (state) => state.userRole === 'USER',
    },
    actions: {
        login(userRole) {
            this.isAuthenticated = true
            this.userRole = userRole
        },
        logout() {
            this.isAuthenticated = false
            this.userRole = null
        },
    },
})

export const useLoadingStateStore = defineStore('is-loading', {
    state: () => ({
        isLoading: false,
    }),
})

export const useMessageStore = defineStore('message-store', {
    state: () => ({
        status: false,
        message: '',
    }),
})
