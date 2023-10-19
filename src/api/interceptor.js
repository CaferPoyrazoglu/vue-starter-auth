// noinspection JSCheckFunctionSignatures

import axiosInstance from '@/api/axiosInstance'
import router from '@/router'
import { useAuthStore } from '@/stores'

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (
            error.response.status === 401 &&
            error.response.data === 'Token süresi doldu.'
        ) {
            console.log('Token süresi doldu, yenilemeye çalışılıyor.')
            try {
                console.log(
                    'Token yenilemesi için istek atılıyor.',
                    localStorage.getItem('refresh_token')
                )
                const response = await axiosInstance.post(
                    '/auth/refresh-token',
                    null,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                'refresh_token'
                            )}`,
                        },
                    }
                )
                console.log('response', response)

                console.log('Token yenilendi: ', response.data.access_token)
                localStorage.setItem('access_token', response.data.access_token)

                const { config } = error
                config.headers.Authorization = `Bearer ${response.data.access_token}`
                return axiosInstance.request(config)
            } catch (refreshError) {
                if (refreshError.response.status === 403) {
                    console.log('Token süresi doldu, çıkış yapılıyor.')
                    localStorage.removeItem('access_token')
                    localStorage.removeItem('refresh_token')

                    const authStore = useAuthStore()

                    authStore.logout()

                    await router.push({
                        path: '/login',
                        query: {
                            sessionExpired: true,
                        },
                    })
                }
            }
        }

        return Promise.reject(error)
    }
)
