import { apiSlice } from '../../app/api/apiSlice';

export const authApiSlice = apiSlice.injectEndPoints({
    endPoints: builder => ({
        login: builder.mutation({
            query: Credentials => ({
                token: builder.session.token,
                username: builder.session.username,
                password: builder.session.password,
                url: '/auth',
                method: 'POST',
                body: {...Credentials}
            }),
        })
    })
})