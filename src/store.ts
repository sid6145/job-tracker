import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage for web
import jobSliceReducer from './mainSlice'; // Import the job slice reducer

// Combine reducers
const rootReducer = combineReducers({
  job: jobSliceReducer, // Use 'job' instead of 'jobSlice' to match the slice name
});

// Persist Config
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['job'], // Persist the 'job' slice
  debug: true, // Logs persist actions in development
};

// Create Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create Store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'], // Ignore these actions for serializability
      },
    }),
});

// Persistor
export const persistor = persistStore(store);

// TypeScript Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
