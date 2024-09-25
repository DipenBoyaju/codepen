import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authApi } from "../apis/auth.Api";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist'
import userReducer from '../features/auth/auth.slice.js'
import codeEditorReducer from '../features/codeeditor/codeEditorSlice.js'
import { projectApi } from '../apis/project.Api'

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [projectApi.reducerPath]: projectApi.reducer,
  user: userReducer,
  codeEditor: codeEditorReducer,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['token', 'authApi']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(
    {
      serializableCheck: false,
    }
  ).concat(
    authApi.middleware,
    projectApi.middleware
  )
})

export const persistor = persistStore(store)