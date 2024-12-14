import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

// createSlice is used to generate action creator and reducer function based on slice reduxstate

const initialValues = {
    user: null,
    token: null,
    isLoggedIn: false,
    vegetables: [],
    pesticides:[],
    orderPlaced: [],
    orderReceived: [],
}

const vegetableSlice = createSlice({
    name: "vegetable",
    initialState: initialValues,
    reducers: {
        setLogin: (state, action) => {
            console.log(action.payload.user)
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isLoggedIn = true;
        },
        setLogout: (state, action) => {
            state.user = null;
            state.token = null;
            state.isLoggedIn = false;
        },
        setAllVegetable: (state, action) => {
            state.vegetables = action.payload;
        },
        setPostVegetable: (state, action) => {
            state.vegetables.push(action.payload);
        },
        setDeleteVegetable: (state, action) => {
            const vegetableId = action.payload;
            state.vegetables = state.vegetables.filter(vegetable => vegetable._id != vegetableId);

        },
        setVegetableEdit: (state, action) => {
            console.log(action.payload)
            const vegetableId = action.payload._id;
            const updatedVegetable = action.payload;
            console.log(vegetableId, updatedVegetable)
            state.vegetables = state.vegetables.map((vegetable) => vegetable._id == vegetableId ? updatedVegetable : vegetable)
        },

        setAllPesticide: (state, action) => {
            state.pesticides = action.payload;
        },
        setPostPesticide: (state, action) => {
            console.log(action.payload)
            state.pesticides.push(action.payload);
        },
        setDeletePesticide: (state, action) => {
            const pesticideId = action.payload;
            state.pesticides = state.pesticides.filter(pesticide => pesticide._id != pesticideId);

        },
        setPesticideEdit: (state, action) => {
            console.log(action.payload)
            const pesticideId = action.payload._id;
            const updatedPesticide = action.payload;
            console.log(pesticideId, updatedPesticide)
            state.pesticides = state.pesticides.map((pesticide) => pesticide._id == pesticideId ? updatedPesticide : pesticide)
        },

        setAllOrders:(state,action)=>{
            state.orderPlaced=action.payload;
        },

        setOrderPlaced: (state, action) => {
            state.orderPlaced.push(action.payload);
        },
        setOrderReceived: (state, action) => {
            state.orderReceived.push(action.payload);
        },
        setUpdateOrder: (state, action) => {
            console.log(action.payload)
            const index = state.findIndex((order) => order._id === action.payload._id);
            if (index !== -1) state[index] = action.payload;
        },
        setDeleteOrder: (state, action) => {
            state.filter((order) => order._id !== action.payload)
        },
    

}

});

export const { setLogin, setLogout, setAllVegetable, setPostVegetable, setDeleteVegetable, setVegetableEdit, setAllOrders,setOrderPlaced, setOrderReceived,setDeleteOrder,setUpdateOrder,setAllPesticide,setPesticideEdit,setDeletePesticide,setPostPesticide } = vegetableSlice.actions;
export default vegetableSlice.reducer;
