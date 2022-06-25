import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/index';
import { handleAlerts } from '../crudFeedbackSlice';

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
    project: {
        users: [],
    },
}

export const getProjectDetails = createAsyncThunk('project/getProjectDetails', async (id, {dispatch, rejectWithValue}) => {
    try {
        const { data } = await api.getProjectDetails(id);
        // console.log(data);
        
        return data;
    } catch (error) {
        console.log(error);
        dispatch(handleAlerts({ severity: 'error', message: `Failed to get project details of project id: ${id}`}));
        return rejectWithValue(error);
    }
});

export const updateProject = createAsyncThunk('project/updateProject', async (newProject, { dispatch, rejectWithValue }) => {
    try {
        console.log("updatedProject :", newProject);
        const { data } = await api.updateProject(newProject);

        dispatch(handleAlerts({ severity: 'success', message: `Project Id: ${newProject._id} was successfully updated` }));

        return data
    } catch (error) {
        console.log(error);
        dispatch(handleAlerts({ severity: 'error', message: `Project was not able to be edited. Error: ${error.message}` }));
        return rejectWithValue(error)
    }
})

export const moveProjectToArchive = createAsyncThunk('project/moveProjectToArchive', async (id, {dispatch, rejectWithValue}) => {
    try {
        const { data } = await api.moveProjectToArchive(id);

        dispatch(handleAlerts({ severity: 'success', message: `Project has been successfully deleted and moved to the Project Archive.` }))
        return data
    } catch (error) {
        console.log(error)
        dispatch(handleAlerts({ severity: 'error', message: `Project failed to delete. Error: ${error.message}`}))

        return rejectWithValue(error)
    }
})

export const updateUsersRoles = createAsyncThunk('project/updateUsersRoles', async ({ projectId, users }, { dispatch, rejectWithValue }) => {
    try {
        const { data } = await api.updateUsersRoles(projectId, users);

        dispatch(handleAlerts({ severity: 'success', message: `Users' roles were successfully updated` }))
        return data
    } catch (error) {
        console.log(error);
        dispatch(handleAlerts({ severity: 'error', message: `User's roles failed to update. Error ${error.message}` }));
        return rejectWithValue(error);
    }
})


const projectDetailsSlice = createSlice({
    name: 'projectDetails',
    initialState,
    extraReducers: builder => {
        // Get Project Details
        builder.addCase(getProjectDetails.pending, (state) => {
            state.getProjectDetails.loading = true;
        })
        builder.addCase(getProjectDetails.fulfilled, (state, action) => {
            state.getProjectDetails.loading = false;
            state.project = action.payload;
        })
        builder.addCase(getProjectDetails.rejected, (state, action) => {
            state.getProjectDetails.loading = false;
            state.getProjectDetails.error = action.payload.message;
        })
        // Update Project
        builder.addCase(updateProject.pending, (state) => {
            state.updateProject.loading = true;
        })
        builder.addCase(updateProject.fulfilled, (state) => {
            state.updateProject.loading = false;
        })
        builder.addCase(updateProject.rejected, (state, action) => {
            state.updateProject.loading = false;
            state.updateProject.error = action.payload.message;
        })

        // Move Project To Archive
        builder.addCase(moveProjectToArchive.pending, (state) => {
            state.moveProjectToArchive.loading = true;
        })
        builder.addCase(moveProjectToArchive.fulfilled, (state) => {
            state.moveProjectToArchive.loading = false;
        })
        builder.addCase(moveProjectToArchive.rejected, (state, action) => {
            state.moveProjectToArchive.loading = false;
            state.moveProjectToArchive.error = action.payload.message;
        })
    }
})

export default projectDetailsSlice.reducer;

