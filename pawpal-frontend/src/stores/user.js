import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore({
    id: 'user',

    // all the attributes of the user
    state: () => ({
        user: {
            isAuthenticated: false,
            id: null,
            name: null,
            email: null,
            access: null,
            refresh: null,
            avatar: null
        }
    }),

    actions: {
        // initialization, checks if there is an access token in local storage. if there is, set user info and authentication
        initStore() {
            console.log('initStore', localStorage.getItem('user.access'))

            if (localStorage.getItem('user.access')) {
                console.log('User has access!')

                this.user.access = localStorage.getItem('user.access')
                this.user.refresh = localStorage.getItem('user.refresh')
                this.user.id = localStorage.getItem('user.id')
                this.user.name = localStorage.getItem('user.name')
                this.user.email = localStorage.getItem('user.email')
                this.user.avatar = localStorage.getItem('user.avatar')
                this.user.isAuthenticated = true

                this.refreshToken() // talks to back end to check token

                console.log('Initialized user:', this.user)
            }
        },

        // logging in - stores user tokens in local storage
        setToken(data) {
            console.log('setToken', data)

            this.user.access = data.access
            this.user.refresh = data.refresh
            this.user.isAuthenticated = true

            localStorage.setItem('user.access', data.access)
            localStorage.setItem('user.refresh', data.refresh)

            console.log('user.access: ', localStorage.getItem('user.access'))
        },

        // logging out - removes user data from local storage
        removeToken() {
            console.log('removeToken')

            this.user.refresh = null
            this.user.access = null
            this.user.isAuthenticated = false
            this.user.id = null
            this.user.name = null
            this.user.email = null
            this.user.avatar = null

            localStorage.setItem('user.access', '')
            localStorage.setItem('user.refresh', '')
            localStorage.setItem('user.id', '')
            localStorage.setItem('user.name', '')
            localStorage.setItem('user.email', '')
            localStorage.setItem('user.avatar', '')
        },

        // sets user's information and stores it in local storage
        setUserInfo(user) {
            console.log('setUserInfo', user)

            this.user.id = user.id
            this.user.name = user.name
            this.user.email = user.email
            this.user.avatar = user.avatar

            localStorage.setItem('user.id', this.user.id)
            localStorage.setItem('user.name', this.user.name)
            localStorage.setItem('user.email', this.user.email)
            localStorage.setItem('user.avatar', this.user.avatar)

            console.log('User', this.user)
        },

        // sends post request to api endpoint to obtain a new access token
        refreshToken() {
            axios.post('/api/account/refresh/', {
                refresh: this.user.refresh
            })
                .then((response) => {
                    this.user.access = response.data.access

                    localStorage.setItem('user.access', response.data.access)
                    // if successful, update axios headers to include the new token
                    axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.access
                })
                .catch((error) => {
                    console.log(error)

                    this.removeToken() // clear user token's upon request failure
                })
        },
    }
})