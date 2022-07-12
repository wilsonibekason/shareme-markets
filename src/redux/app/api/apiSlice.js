export {createApi, fetchBaseQuery } from '@reduxjs/toolkit';
export {setCredentials, logOut} from '../../feature/auth/authSlice'

const baseQuery = fetchBaseQuery({
    baseUrl: 'backendURL',
    credentials: 'include',
    prepareHeader: (headers, {getState}) => {
        const token = getState().auth.token
        if(token) {
            headers.set('authorization', `Bearer ${token}`)
        }
        return headers
    }
})

// create wrapper for baseQuery
const baseQuerywithReAuth = async (args, api, extraOptions) => {
    let result  = await baseQuery(args, api, extraOptions)
    // optional chaining
    if(result?.error?.originalStatus === 403){
      console.log('sending refresh token');
      // send refresh token get new access  token
      const refreshResults = await baseQuery('/refresh', api, extraOptions)
      console.log(refreshResults)
    if(refreshResults?.data) {
       
    } 
  }
}