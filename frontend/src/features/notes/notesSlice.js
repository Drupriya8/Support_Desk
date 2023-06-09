import {createSlice , createAsyncThunk} from '@reduxjs/toolkit'
import notesService from './notesService'

const initialState  = {
    notes : [],
    isError : false,
    isLoading : false,
    isSuccess : false,
    message : ""
}


const notesSlice = createSlice({
    name : 'note',
    initialState,
    reducers : {
        reset : (state) => initialState
    },
    extraReducers : (builder) => {
        builder
        .addCase(getNotes.pending , (state)=>{
            state.isLoading = true
        })
        .addCase(getNotes.fulfilled , (state , action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.notes = action.payload
        })
        .addCase(getNotes.rejected , (state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.payload
        })
        .addCase(createNote.pending , (state)=>{
            state.isLoading = true
        })
        .addCase(createNote.fulfilled , (state , action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.notes.push(action.payload)
        })
        .addCase(createNote.rejected , (state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.payload
        })
    }
})


// Get Tickets

export const getNotes = createAsyncThunk('notes/getAll' , async(ticketId , thunkAPI)=>{

    try {
        const token = thunkAPI.getState().auth.user.token
        return await notesService.getNotes(ticketId , token)
    } catch (error) {
        
        const message = (error.message && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)

    }

})


// create a ticket Note

export const createNote = createAsyncThunk('notes/create' , async({noteText , ticketId} , thunkAPI)=>{
    try {
        const token = thunkAPI.getState().auth.user.token
        return await notesService.createNote(noteText , ticketId , token)
    } catch (error) {
        const message = (error.message && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)

    }
})


export const {reset} = notesSlice.actions
export default notesSlice.reducer