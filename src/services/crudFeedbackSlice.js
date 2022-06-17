import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isShown: false,
    severity: null,
    message: "",
};

export const crudFeedbackSlice = createSlice({
    name: "Crud Feedback",
    initialState,
    reducers: {
        crudFeedbackSuccess: (state, action) => {
            console.log("CRUDFEEDBACKSUCCESS!!")
            state.isShown = true;
            state.severity = "success";
            state.message = action?.payload;

            setTimeout(() => {
                console.log("fix this please")
                state.isShown = false;
            }, 3000)
        },
        crudFeedbackFailure: (state, action) => {
            state.isShown = true;
            state.severity = "error";
            state.message = action?.payload;

            setTimeout(() => {
                // state.isShown = false;
            }, 3000)
            state.isShown = false;

        },
        closeCrudFeedback: (state, action) => {
            state.isShown = false;
        },
    }
})

export default crudFeedbackSlice.reducer;
export const {
    crudFeedbackSuccess,
    crudFeedbackFailure,
    closeCrudFeedback,
} = crudFeedbackSlice.actions;