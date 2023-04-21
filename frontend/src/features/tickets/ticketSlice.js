import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import ticketService from './ticketService'


const initialState = {
    tickets : [],
    ticket : {},
    isError : false,
    isLoading : false,
    isSuccess : false,
    message : ""
}

const ticketSlice = createSlice({
    name : 'ticket',
    initialState,
    reducers : {
        reset : (state) => initialState
    },
    extraReducers : (builder) => {
        builder
        .addCase(createTicket.pending , (state)=>{
            state.isLoading = true
        })
        .addCase(createTicket.fulfilled , (state)=>{
            state.isLoading = false
            state.isSuccess = true
        })
        .addCase(createTicket.rejected , (state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.payload
        })
        .addCase(getTickets.pending , (state)=>{
            state.isLoading = true
        })
        .addCase(getTickets.fulfilled , (state , action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.tickets = action.payload
        })
        .addCase(getTickets.rejected , (state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.payload
        })
        .addCase(getSingleTicket.pending , (state)=>{
            state.isLoading = true
        })
        .addCase(getSingleTicket.fulfilled , (state , action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.ticket = action.payload
        })
        .addCase(getSingleTicket.rejected , (state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.payload
        })
        .addCase(closeTicket.fulfilled , (state,action) => {
            state.isLoading = false
            state.tickets.map(ticket=> ticket.id === action.payload._id ? (ticket.status = "closed") : ticket)
        })
    }
})

export const createTicket = createAsyncThunk('ticket/create' , async(ticketData , thunkAPI)=>{

    try {
        const token = thunkAPI.getState().auth.user.token
       return await ticketService.createTicket(ticketData , token)
    } catch (error) {
        const message = (error.message && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }

})


export const getTickets = createAsyncThunk("ticket/getAll" , async( _ , thunkAPI ) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await ticketService.getTickets(token)
    } catch (error) {
        const message = (error.message && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


export const getSingleTicket = createAsyncThunk("ticket/singleTicket" , async( id , thunkAPI ) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await ticketService.getSingleTicket(id , token)
    } catch (error) {
        const message = (error.message && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const closeTicket = createAsyncThunk("ticket/close" , async( ticketId , thunkAPI ) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await ticketService.closeTicket(ticketId , token)
    } catch (error) {
        const message = (error.message && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


export const {reset} = ticketSlice.actions
export default ticketSlice.reducer