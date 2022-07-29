import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/index';
import { handleAlerts } from '../alertsSlice';

const initialState = {
  getProjectDetails: {
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
    status: '',
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
          message: `Failed to get project tickets. Error: ${error.response.data.message}`,
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
          message: `Project was not able to be edited. Error: ${error.response.data.message}`,
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
          message: `Project failed to delete. Error: ${error.response.data.message}`,
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
          message: `Project failed to restore. Error: ${error.response.data.message}`,
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
      const { data } = await api.deleteProjectFromArchive(projectId);

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
          message: `Project failed to delete from archive. Error: ${error.response.data.message}`,
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
    projectTicketsShowArchived: (state) => ({
      // toggle the show archived property
      ...state,
      projectTickets: {
        ...state.projectTickets,
        showArchived: !state.projectTickets.showArchived,
      },
    }),
    searchProjectTickets: (state, action) => {
      const { searchQuery, currentPage, itemsPerPage, showArchived } = action.payload;
      const search = searchQuery.toLowerCase();

      const ticketArr = state.projectTickets.original;
      let newTickets = [];

      // loop through array to check for the contained string
      for (let i = 0; i < ticketArr.length; i += 1) {
        const ticketDetails = ticketArr[i];

        // if the search is in the name or the email of the user, add to object
        if (ticketDetails.title.toLowerCase().includes(search.toLowerCase())) {
          // if dont show archive, and the ticket is archived, it would skip the ticket
          if (showArchived || ticketDetails.status !== 'Archived') {
            newTickets.push(ticketDetails);
          }
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

  },
});

export default projectDetailsSlice.reducer;
export const { searchProjectTickets, searchUnassignedProjectTickets, projectTicketsShowArchived } =
  projectDetailsSlice.actions;
