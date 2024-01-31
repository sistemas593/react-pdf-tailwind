import { createSlice } from "@reduxjs/toolkit";

export const recfacturasSlice = createSlice({
    name: 'recfacturas',
    initialState: {
        recfacturas: [],
        paginator: {},
    },
});

export const {
} = recfacturasSlice.actions;