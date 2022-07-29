// import { configureStore } from '@reduxjs/toolkit';

// import singleCard from './slices/singlePaintingSlice'
// import breadCrumbs from './slices/breadCrumbsSlice'

// export const store = configureStore({
// 	reducer: {
//         singleCard,
//         breadCrumbs
//     },
// });


import { configureStore } from '@reduxjs/toolkit' 

import authorsInfos from './slices/authorsInfosSlice'
import breadCrumbs from './slices/breadCrumbsSlice'
import newsItems from './slices/newsSlice'
import filters from './slices/filtersSlice'
import user from './slices/userSlice'

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
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
    devTools: process.env.NODE_ENV !== 'production'
})