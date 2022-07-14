import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import * as api from '../../api/index';
import { handleAlerts } from '../alertsSlice';

const initialState = {
  getProjectDetails: {
    loading: false,
    error: '',
  },
  updateProject: {
    loading: false,
    error: '',
  },
  moveProjectToArchive: {
    loading: false,
    error: '',
  },
  updateUsersRoles: {
    loading: false,
    error: '',
  },
  deleteUsersFromProject: {
    loading: false,
    error: '',
  },
  getProjectTickets: {
    loading: false,
    error: '',
  },
  getProjectUsers: {
    loading: false,
    error: '',
  },
  project: {
    name: '',
    title: '',
    createdAt: '',
  },
  projectTickets: {
    original: [],
    searched: [],
    numberOfPage: 1,
  },
  projectUsers: {
    original: {},
    searched: [],
    numberOfPages: 1,
  },
};

export const getProjectDetails = createAsyncThunk(
  'project/getProjectDetails',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await api.getProjectDetails(id);

      return data;
    } catch (error) {
      console.log(error);
      dispatch(
        handleAlerts({
          severity: 'error',
          message: `Failed to get project details of project id: ${id}`,
        })
      );
      return rejectWithValue(error);
    }
  }
);

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
          message: `Failed to get project tickets. Error: ${error.message}`,
        })
      );
      return rejectWithValue(error);
    }
  }
);
export const getProjectTickets = createAsyncThunk(
  'project/getProjectTickets',
  async (projectId, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await api.getProjectTickets(projectId);

      return data;
    } catch (error) {
      console.log(error);
      dispatch(
        handleAlerts({
          severity: 'error',
          message: `Failed to get project tickets. Error: ${error.message}`,
        })
      );
      return rejectWithValue(error);
    }
  }
);

export const updateProject = createAsyncThunk(
  'project/updateProject',
  async (newProject, { dispatch, rejectWithValue }) => {
    try {
      console.log('updatedProject :', newProject);
      const { data } = await api.updateProject(newProject);

      dispatch(
        handleAlerts({
          severity: 'success',
          message: `Project Id: ${newProject._id} was successfully updated`,
        })
      );

      return data;
    } catch (error) {
      console.log(error);
      dispatch(
        handleAlerts({
          severity: 'error',
          message: `Project was not able to be edited. Error: ${error.message}`,
        })
      );
      return rejectWithValue(error);
    }
  }
);

export const moveProjectToArchive = createAsyncThunk(
  'project/moveProjectToArchive',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await api.moveProjectToArchive(id);

      dispatch(
        handleAlerts({
          severity: 'success',
          message: 'Project has been successfully deleted and moved to the Project Archive.',
        })
      );
      return data;
    } catch (error) {
      console.log(error);
      dispatch(
        handleAlerts({
          severity: 'error',
          message: `Project failed to delete. Error: ${error.message}`,
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

      //    this was cheged while fixing the code
      // Object.keys(users).map((element) => {
      //   users[element].role = role;
      // });
      const usersCopy = { ...users };
      Object.keys(usersCopy).map((userId) => {
        usersCopy[userId].role = role;
      });

      const { data } = await api.updateUsersRoles(projectId, users);

      dispatch(
        handleAlerts({ severity: 'success', message: 'Users roles were successfully updated' })
      );
      return data;
    } catch (error) {
      console.log(error);
      dispatch(
        handleAlerts({
          severity: 'error',
          message: `User's roles failed to update. Error ${error.message}`,
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
          message: `Users were unable to be deleted formt he project. Error: ${error.message}`,
        })
      );
      return rejectWithValue(error);
    }
  }
);

const projectDetailsSlice = createSlice({
  name: 'projectDetails',
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
    searchProjectTickets: (state, action) => {
      const { searchQuery, currentPage, itemsPerPage } = action.payload;
      const search = searchQuery.toLowerCase();

      const ticketArr = state.projectTickets.original;
      let newTickets = [];

      // loop through array to check for the contained string
      for (let i = 0; i < ticketArr.length; i += 1) {
        const ticketDetails = ticketArr[i];

        // if the search is in the name or the email of the user, add to object
        if (ticketDetails.title.toLowerCase().includes(search.toLowerCase())) {
          newTickets.push(ticketDetails);
        }
      }

      // only return array that the page contains
      const numberOfPages = Math.ceil(newTickets.length / itemsPerPage);
      newTickets = newTickets.splice((currentPage - 1) * itemsPerPage, itemsPerPage);

      return {
        ...state,
        projectTickets: { ...state.projectTickets, searched: newTickets, numberOfPages },
      };
    },
    searchUnassignedProjectTickets: (state, action) => {
      const { searchQuery, currentPage, itemsPerPage } = action.payload;
      const search = searchQuery.toLowerCase();

      const ticketArr = state.projectTickets.original;
      let newTickets = [];

      // loop through array to check for the contained string
      for (let i = 0; i < ticketArr.length; i += 1) {
        const ticketDetails = ticketArr[i];

        // if the search is in the name or the email of the user, add to object
        if (ticketDetails.title.toLowerCase().includes(search.toLowerCase())) {
          newTickets.push(ticketDetails);
        }
      }

      // only return array that the page contains
      const numberOfPages = Math.ceil(newTickets.length / itemsPerPage);
      newTickets = newTickets.splice((currentPage - 1) * itemsPerPage, itemsPerPage);

      return {
        ...state,
        projectTickets: { ...state.projectTickets, searched: newTickets, numberOfPages },
      };
    },
  },
  extraReducers: (builder) => {
    // Get Project Details
    builder.addCase(getProjectDetails.pending, (state) => {
      const currentState = state;
      currentState.getProjectDetails.loading = true;
    });
    builder.addCase(getProjectDetails.fulfilled, (state, action) => {
      const currentState = state;
      currentState.getProjectDetails.loading = false;
      currentState.project = action.payload;
    });
    builder.addCase(getProjectDetails.rejected, (state, action) => {
      const currentState = state;
      currentState.getProjectDetails.loading = false;
      currentState.getProjectDetails.error = action.payload.message;
    });
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
    // get project tickets
    builder.addCase(getProjectTickets.pending, (state) => {
      const currentState = state;
      currentState.getProjectTickets.loading = true;
    });
    builder.addCase(getProjectTickets.fulfilled, (state, action) => {
      const currentState = state;
      currentState.getProjectTickets.loading = false;
      currentState.projectTickets.original = action.payload;
    });
    builder.addCase(getProjectTickets.rejected, (state, action) => {
      const currentState = state;
      currentState.getProjectTickets.loading = false;
      currentState.getProjectTickets.error = action.payload.message;
    });
    // Update Project
    builder.addCase(updateProject.pending, (state) => {
      const currentState = state;
      currentState.updateProject.loading = true;
    });
    builder.addCase(updateProject.fulfilled, (state) => {
      const currentState = state;
      currentState.updateProject.loading = false;
    });
    builder.addCase(updateProject.rejected, (state, action) => {
      const currentState = state;
      currentState.updateProject.loading = false;
      currentState.updateProject.error = action.payload.message;
    });

    // Move Project To Archive
    builder.addCase(moveProjectToArchive.pending, (state) => {
      const currentState = state;
      currentState.moveProjectToArchive.loading = true;
    });
    builder.addCase(moveProjectToArchive.fulfilled, (state) => {
      const currentState = state;
      currentState.moveProjectToArchive.loading = false;
    });
    builder.addCase(moveProjectToArchive.rejected, (state, action) => {
      const currentState = state;
      currentState.moveProjectToArchive.loading = false;
      currentState.moveProjectToArchive.error = action.payload.message;
    });

    // Update Users Roles
    builder.addCase(updateUsersRoles.pending, (state) => {
      const currentState = state;
      currentState.updateUsersRoles.loading = true;
    });
    builder.addCase(updateUsersRoles.fulfilled, (state) => {
      const currentState = state;
      currentState.updateUsersRoles.loading = false;
    });
    builder.addCase(updateUsersRoles.rejected, (state, action) => {
      const currentState = state;
      currentState.updateUsersRoles.loading = false;
      currentState.updateUsersRoles.error = action.payload.message;
    });

    // Delete Users From Project
    builder.addCase(deleteUsersFromProject.pending, (state) => {
      const currentState = state;
      currentState.deleteUsersFromProject.loading = true;
    });
    builder.addCase(deleteUsersFromProject.fulfilled, (state) => {
      const currentState = state;
      currentState.deleteUsersFromProject.loading = false;
    });
    builder.addCase(deleteUsersFromProject.rejected, (state, action) => {
      const currentState = state;
      currentState.deleteUsersFromProject.loading = false;
      currentState.deleteUsersFromProject.error = action.payload.message;
    });
  },
});

export default projectDetailsSlice.reducer;
export const { searchProjectUsers, searchProjectTickets, searchUnassignedProjectTickets } =
  projectDetailsSlice.actions;
