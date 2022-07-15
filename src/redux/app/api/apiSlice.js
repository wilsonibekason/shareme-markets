import {createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {setCredentials, logOut} from '../../feature/auth/authSlice'
  
const baseQuery = fetchBaseQuery({
    baseUrl: 'backendURL',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token
        if(token) {
            headers.set('authorization', `Bearer ${token}`)
        }
        return headers
    }
})

// create wrapper for baseQuery
const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result  = await baseQuery(args, api, extraOptions)
    // optional chaining
    if(result?.error?.originalStatus === 403){
      console.log('sending refresh token');
      // send refresh token get new access  token
      const refreshResults = await baseQuery('/refresh', api, extraOptions)
      console.log(refreshResults)
    if(refreshResults?.data) {
       const user = api.getState().auth.user
       // store the API token here 
       api.dispatch(setCredentials({...refreshResults?.data, user}))
       // retry the original query with new access token
       result = await baseQuery(args, api, extraOptions)
    }  else{
      api.dispatch(logOut());
    }
  }
  return result;
}
// exporting the apiSlice
export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({})
})

