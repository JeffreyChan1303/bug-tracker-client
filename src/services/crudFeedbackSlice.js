import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    alerts: [],
};


export const handleAlerts = createAsyncThunk( 'alert/handleAlert', async ({ severity, message }, {dispatch, getState}) => {
    dispatch(addCrudFeedback({ severity: severity, message: message }));

    const { crudFeedback: { alerts } } = getState()
    const { id } = alerts[alerts.length - 1]

    console.log(id);
    setTimeout(() => {
        dispatch(closeCrudFeedbackById(id));
        console.log("wee wee handled alerts")
    }, 10000)
})

// we need to have unique id numbers to delete cirtain object

export const crudFeedbackSlice = createSlice({
    name: "Crud Feedback",
    initialState,
    reducers: {
        addCrudFeedback: (state, action) => {
            console.log("addCrudFeedback action: ", action?.payload)
            let id = Math.floor(Math.random() * 100 + 1)
            while (state.alerts.findIndex(e => e.id === id) !== -1) {
                id = Math.floor(Math.random() * 100 + 1);
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
            console.log("close crud by id")
            console.log(action?.payload)
            const index = state.alerts.findIndex(e => e.id === action?.payload)
            // only if the id is in the array
            if (index != -1) {
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