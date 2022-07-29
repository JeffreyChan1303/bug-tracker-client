import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import * as api from '../../api/index';
import { handleAlerts } from '../alertsSlice';

const initialState = {
  getProjectUsers: {
    loading: false,
    error: '',
  },
  projectUsers: {
    original: {},
    searched: [],
    numberOfPages: 1,
  },
};

export const getProjectUsers = createAsyncThunk(
  'project/getProjectUsers',
  async (projectId, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await api.getProjectUsers(projectId);

      return data;
    } catch (error) {
      console.log(error);
      dispatch(
        handleAlerts({
          severity: 'error',
          message: `Failed to get project tickets. Error: ${error.response.data.message}`,
        })
      );
      return rejectWithValue(error);
    }
  }
);

export const updateUsersRoles = createAsyncThunk(
  'project/updateUsersRoles',
  async ({ projectId, users, role }, { dispatch, rejectWithValue }) => {
    try {
      // this loop sets the role of all the user objects

      const usersCopy = { ...users };
      Object.keys(usersCopy).map((userId) => {
        usersCopy[userId].role = role;
        return userId;
      });

      const { data } = await api.updateUsersRoles(projectId, users);

      dispatch(
        // make a loop to make a string of users whose role was changed
        handleAlerts({ severity: 'success', message: data.message })
      );

      return data;
    } catch (error) {
      console.log(error);
      dispatch(
        handleAlerts({
          severity: 'error',
          message: `User's roles failed to update. Error: ${error.response.data.message}`,
        })
      );
      return rejectWithValue(error);
    }
  }
);

export const inviteUsersToProject = createAsyncThunk(
  'project/inviteUsersToProject',
  async ({ projectId, users, role }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await api.inviteUsersToProject(projectId, users, role);

      // there should be a funtion to make the users into a string and
      // put them into the alert so the user knows who they invited
      console.log(data);
      dispatch(handleAlerts({ severity: 'success', message: data.message }));
      return data;
    } catch (error) {
      console.log(error);
      dispatch(
        handleAlerts({
          severity: 'error',
          message: `Failed to invite users to project. Error: ${error.response.data.message}`,
        })
      );
      return rejectWithValue(error);
    }
  }
);

export const acceptProjectInvite = createAsyncThunk(
  'project/acceptProjectInvite',
  async (notification, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await api.acceptProjectInvite(notification);

      dispatch(
        handleAlerts({ severity: 'success', message: 'Successfully accepted project invite' })
      );
      return data;
    } catch (error) {
      console.log(error);
      dispatch(
        handleAlerts({
          severity: 'error',
          message: `Failed to accept project invite. Error: ${error.response.data.message}`,
        })
      );
      return rejectWithValue(error);
    }
  }
);

export const deleteUsersFromProject = createAsyncThunk(
  'project/deleteUsersFromProject',
  async ({ projectId, users }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await api.deleteUsersFromProject(projectId, users);
      dispatch(
        handleAlerts({
          severity: 'success',
          message: "Users' were successfully deleted from the project",
        })
      );
      return data;
    } catch (error) {
      console.log(error);
      dispatch(
        handleAlerts({
          severity: 'error',
          message: `Users were unable to be deleted form the project. Error: ${error.response.data.message}`,
        })
      );
      return rejectWithValue(error);
    }
  }
);

const projectUsersSlice = createSlice({
  name: 'Project Users',
  initialState,
  reducers: {
    searchProjectUsers: (state, action) => {
      const { searchQuery, currentPage, itemsPerPage } = action.payload;
      const search = searchQuery.toLowerCase();

      let newUsers = [];

      const userArr = Object.keys(state.projectUsers.original);

      // loop through array to check for the contained string
      for (let i = 0; i < userArr.length; i += 1) {
        const id = userArr[i];
        const userDetails = { ...current(state.projectUsers.original[id]), _id: id };

        // if the search is in the name or the email of the user, add to array
        if (
          userDetails.name.toLowerCase().includes(search.toLowerCase()) ||
          userDetails.email.toLowerCase().includes(search)
        ) {
          newUsers.push(userDetails);
        }
      }

      // only return array that the page contains
      const numberOfPages = Math.ceil(newUsers.length / itemsPerPage);
      newUsers = newUsers.splice((currentPage - 1) * itemsPerPage, itemsPerPage);

      return {
        ...state,
        projectUsers: { ...state.projectUsers, searched: newUsers, numberOfPages },
      };
    },
  },
  extraReducers: (builder) => {
    // get project users
    builder.addCase(getProjectUsers.pending, (state) => {
      const currentState = state;
      currentState.getProjectUsers.loading = true;
    });
    builder.addCase(getProjectUsers.fulfilled, (state, action) => {
      const currentState = state;
      currentState.getProjectUsers.loading = false;
      currentState.projectUsers.original = action.payload;
    });
    builder.addCase(getProjectUsers.rejected, (state, action) => {
      const currentState = state;
      currentState.getProjectUsers.loading = false;
      currentState.getProjectUsers.error = action.payload.message;
    });

  },
});

export default projectUsersSlice.reducer;

export const { searchProjectUsers } = projectUsersSlice.actions;
