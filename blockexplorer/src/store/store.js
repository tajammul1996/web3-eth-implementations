import { configureStore } from "@reduxjs/toolkit"
import { blockSlice } from "./block.reducer"

const store = configureStore({
    reducer: {
        blocks: blockSlice.reducer,
    },
    devTools: true,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
        
})

export default store
