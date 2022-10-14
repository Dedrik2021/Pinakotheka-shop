// import { configureStore } from '@reduxjs/toolkit';

// import authorsInfos from './slices/authorsInfosSlice'
// import breadCrumbs from './slices/breadCrumbsSlice'
// import newsItems from './slices/newsSlice'
// import filters from './slices/filtersSlice'
// import user from './slices/userSlice'

// export const store = configureStore({
// 	reducer: {
//         authorsInfos, 
//         breadCrumbs, 
//         newsItems,
//         filters,
//         user
//     },
// });


import { configureStore } from '@reduxjs/toolkit' 
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import authorsInfos from './slices/authorsInfosSlice'
import breadCrumbs from './slices/breadCrumbsSlice'
import newsItems from './slices/newsSlice'
import filters from './slices/filtersSlice'
import user from './slices/userSlice'
import { database } from '../firebase/firebaseConfig'

const stringMiddleware = () => (next) => (action) => {
    if (typeof action === 'string') {
        return next({
            type: action
        })
    }
    return next(action)
}

export const store = configureStore({
    reducer: {
        authorsInfos, 
        breadCrumbs, 
        newsItems,
        filters,
        user
    },
    // middleware: (getDefaultMiddleware) => 
    //     getDefaultMiddleware({
    //         thunk: {
    //             extraArgument: database,
    //         },
    //     }
    // )
    // .concat(stringMiddleware),
    // devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
})
// export const store = configureStore({
//     reducer: {
//         authorsInfos, 
//         breadCrumbs, 
//         newsItems,
//         filters,
//         user
//     },
//     middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
//     devTools: process.env.NODE_ENV !== 'production'
// })