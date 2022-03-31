import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice'
import teamReducer from '../features/team/teamSlice'
import taskReducer from '../features/task/taskSlice'

const store = configureStore({
    reducer:{
        user:userReducer,
        team:teamReducer,
        task:taskReducer
    }
})

export default store 