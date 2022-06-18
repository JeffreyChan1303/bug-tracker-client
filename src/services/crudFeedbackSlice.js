import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    alerts: [],
};

export const handleAlerts = createAsyncThunk( 'alert/handleAlert', async ({ severity, message }, {dispatch, getState}) => {
    dispatch(addCrudFeedback({ severity: severity, message: message }));

    const { crudFeedback: { alerts } } = getState()
    const { id } = alerts[alerts.length - 1]

    setTimeout(() => {
        dispatch(closeCrudFeedbackById(id));
    }, 6000)
})

// we need to have unique id numbers to delete cirtain object

export const crudFeedbackSlice = createSlice({
    name: "Crud Feedback",
    initialState,
    reducers: {
        addCrudFeedback: (state, action) => {
            var id = Math.floor(Math.random() * 100 + 1)
            // while the new id is the same as an id in the array, find another id
            while (state.alerts.findIndex(e => e.id === id) !== -1) {
                id = Math.floor(Math.random() * 100 + 1)
            }
            
            state.alerts.push({
                // gets a random number as the key for the alert
                id: id,
                isShown: true,
                severity: action?.payload.severity,
                message: action?.payload.message,
            })
        },
        closeCrudFeedbackById: (state, action) => {
            const index = state.alerts.findIndex(e => e.id === action?.payload)
            // only if the id is in the array
            if (index !== -1) {
                state.alerts.splice(index, 1);
            }
        },
    }
})

export default crudFeedbackSlice.reducer;
export const {
    addCrudFeedback,
    closeCrudFeedbackById,
} = crudFeedbackSlice.actions;