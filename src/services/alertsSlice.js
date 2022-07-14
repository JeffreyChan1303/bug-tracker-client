import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  alerts: [],
};

// we need to have unique id numbers to delete cirtain object
export const alertsSlice = createSlice({
  name: 'Alert',
  initialState,
  reducers: {
    addAlert: (state, action) => {
      let id = Math.floor(Math.random() * 100 + 1);
      // while the new id is the same as an id in the array, find another id

      // eslint-disable-next-line no-loop-func
      while (state.alerts.findIndex((e) => e.id === id) !== -1) {
        id = Math.floor(Math.random() * 100 + 1);
      }

      state.alerts.push({
        // gets a random number as the key for the alert
        id,
        isShown: true,
        severity: action?.payload.severity,
        message: action?.payload.message,
      });
    },
    closeAlertById: (state, action) => {
      const index = state.alerts.findIndex((e) => e.id === action?.payload);
      // only if the id is in the array
      if (index !== -1) {
        state.alerts.splice(index, 1);
      }
    },
  },
});

export default alertsSlice.reducer;
export const { addAlert, closeAlertById } = alertsSlice.actions;

export const handleAlerts = createAsyncThunk(
  'alert/handleAlert',
  async ({ severity, message }, { dispatch, getState }) => {
    dispatch(addAlert({ severity, message }));

    // gets the alerts property from the alerts store!
    const { alerts } = getState().alerts;
    const { id } = alerts[alerts.length - 1];

    setTimeout(() => {
      dispatch(closeAlertById(id));
    }, 6000);
  }
);
