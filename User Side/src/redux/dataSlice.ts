import { createSlice} from "@reduxjs/toolkit";

const dataSlice = createSlice({
    name: "data",
    initialState: {
        data: null,
        loading: false,
        error: null,
        loginData: {},
        selectedUser: {},
        selectedOrderDetails: {},
        vendorDetails: {},
        selectedItems: [],
    },
    reducers: {
        // fetchDataRequest: (state) => {
        //     state.loading = true;
        // },
        // fetchDataSuccess: (state, action) => {
        //     state.loading = false;
        //     state.data = action.payload;
        // },
        // fetchDataFailure: (state, action) => {
        //     state.loading = false;
        //     state.error = action.payload;
        // },
        addLoginData: (state, action) => {
            state.loginData = action.payload;
        },
        addSelectedUserData: (state, action) => {
            state.selectedUser = action.payload;
        },
        addSelectedOrderDetails: (state, action) => {
            state.selectedOrderDetails = action.payload;
        },
        addClothType: (state, action) => {
            const { id, type } = action.payload;
            if (!state.selectedItems.some(item => item.id === id)) {
              state.selectedItems.push({
                id,
                type,
                selectedService: null,
                quantity: 1,
                totalPrice: 0,
              });
            }
        },
        removeClothType: (state, action) => {
            state.selectedItems = state.selectedItems.filter(item => item.id !== action.payload);
        },
        updateService: (state, action) => {
            const { id, service, price } = action.payload;
            state.selectedItems = state.selectedItems.map(item =>
                item.id === id
                ? { ...item, selectedService: service, totalPrice: item.quantity * price }
                : item
            );
        },
        updateQuantity: (state, action) => {
            const { id, quantity, price } = action.payload;
            state.selectedItems = state.selectedItems.map(item =>
                item.id === id
                ? { ...item, quantity, totalPrice: quantity * price }
                : item
            );
        },
    },
});

export const { 
    addLoginData,
    addSelectedOrderDetails,
    addSelectedUserData,
    addClothType, 
    removeClothType, 
    updateService, 
    updateQuantity
} = dataSlice.actions;

export default dataSlice.reducer;
