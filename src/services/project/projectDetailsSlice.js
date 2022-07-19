import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
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
  restoreProjectFrom: {
    loading: false,
    error: '',
  },
  deleteProjectFromArchive: {
    loading: false,
    error: '',
  },
  getProjectTickets: {
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

export const restoreProjectFromArchive = createAsyncThunk(
  'project/restoreProjectFromArchive',
  async (projectId, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await api.restoreProjectFromArchive(projectId);

      dispatch(
        handleAlerts({
          severity: 'success',
          message: 'Project has been successfully restored from the Project Archive.',
        })
      );
      return data;
    } catch (error) {
      console.log(error);
      dispatch(
        handleAlerts({
          severity: 'error',
          message: `Project failed to restore. Error: ${error.message}`,
        })
      );

      return rejectWithValue(error);
    }
  }
);

export const deleteProjectFromArchive = createAsyncThunk(
  'project/deleteProjectFromArchive',
  async (projectId, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await api.moveProjectToArchive(projectId);

      dispatch(
        handleAlerts({
          severity: 'success',
          message: 'Project has been successfully deleted from the Project Archive.',
        })
      );
      return data;
    } catch (error) {
      console.log(error);
      dispatch(
        handleAlerts({
          severity: 'error',
          message: `Project failed to delete from archive. Error: ${error.message}`,
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

    // restore Project From Archive
    builder.addCase(restoreProjectFromArchive.pending, (state) => {
      const currentState = state;
      currentState.restoreProjectFromArchive.loading = true;
    });
    builder.addCase(restoreProjectFromArchive.fulfilled, (state) => {
      const currentState = state;
      currentState.restoreProjectFromArchive.loading = false;
    });
    builder.addCase(restoreProjectFromArchive.rejected, (state, action) => {
      const currentState = state;
      currentState.restoreProjectFromArchive.loading = false;
      currentState.restoreProjectFromArchive.error = action.payload.message;
    });

    // Delete Project From Archive
    builder.addCase(deleteProjectFromArchive.pending, (state) => {
      const currentState = state;
      currentState.deleteProjectFromArchive.loading = true;
    });
    builder.addCase(deleteProjectFromArchive.fulfilled, (state) => {
      const currentState = state;
      currentState.deleteProjectFromArchive.loading = false;
    });
    builder.addCase(deleteProjectFromArchive.rejected, (state, action) => {
      const currentState = state;
      currentState.deleteProjectFromArchive.loading = false;
      currentState.deleteProjectFromArchive.error = action.payload.message;
    });
  },
});

export default projectDetailsSlice.reducer;
export const { searchProjectTickets, searchUnassignedProjectTickets } = projectDetailsSlice.actions;
