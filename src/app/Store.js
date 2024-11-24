import {configureStore} from '@reduxjs/toolkit';
import reducers from './userdata';
export const store = configureStore({
    reducer:reducers
})
export default store;