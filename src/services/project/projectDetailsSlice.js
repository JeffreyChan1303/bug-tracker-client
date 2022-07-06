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
    project: {
        name: '',
        title: '',
        createdAt: '',
        users: {},
        searchedUsers: [],
        assignedUsersNumberOfPages: 1,
        tickets: [],
        searchedTickets: [],
        assignedTicketsNumberOfPages: 1,
    },
}

export const getProjectDetails = createAsyncThunk('project/getProjectDetails', async (id, {dispatch, rejectWithValue}) => {
    try {
        const { data } = await api.getProjectDetails(id);
        console.log(data);
        
        data.tickets.reverse();
        
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

export const updateUsersRoles = createAsyncThunk('project/updateUsersRoles', async ({ projectId, users, role }, { dispatch, rejectWithValue }) => {
    try {
        // this loop sets the role of all the user objects
        Object.keys(users).map((element) => {
            users[element].role = role;
        })
        console.log(users)

        const { data } = await api.updateUsersRoles(projectId, users);

        dispatch(handleAlerts({ severity: 'success', message: `Users' roles were successfully updated` }));
        return data
    } catch (error) {
        console.log(error);
        dispatch(handleAlerts({ severity: 'error', message: `User's roles failed to update. Error ${error.message}` }));
        return rejectWithValue(error);
    }
})

export const deleteUsersFromProject = createAsyncThunk('project/deleteUsersFromProject', async ({ projectId, users }, { dispatch, rejectWithValue }) => {
    try {
        const { data } = await api.deleteUsersFromProject(projectId, users);
        dispatch(handleAlerts({ severity: 'success', message: `Users' were successfully deleted from the project` }));
        return data
    } catch (error) {
        console.log(error);
        dispatch(handleAlerts({ severity: 'error', message: `Users were unable to be deleted formt he project. Error: ${error.message}` }));
        return rejectWithValue(error);
    }
})


const projectDetailsSlice = createSlice({
    name: 'projectDetails',
    initialState,
    reducers: {
        searchProjectUsers: (state, action) => {
            const { searchQuery, currentPage, itemsPerPage } = action.payload;
            const search = searchQuery.toLowerCase();

            let newUsers = []

            const userArr = Object.keys(state.project.users)

            // loop through array to check for the contained string
            for (let i = 0; i < userArr.length; i++) {
                let id = userArr[i]
                let userDetails = { ...current(state.project.users[id]), _id: id }

                // if the search is in the name or the email of the user, add to array
                if (userDetails.name.toLowerCase().includes(search.toLowerCase()) || userDetails.email.toLowerCase().includes(search)) {
                    newUsers.push(userDetails);
                }
            }

            // only return array that the page contains
            const numberOfPages = Math.ceil(newUsers.length / itemsPerPage);
            newUsers = newUsers.splice((currentPage - 1) * itemsPerPage, itemsPerPage)

            return { ...state, project: { ...state.project, searchedUsers: newUsers, assignedUsersNumberOfPages: numberOfPages }}
        },
        searchProjectTickets: (state, action) => {
            const { searchQuery, currentPage, itemsPerPage } = action.payload;
            const search = searchQuery.toLowerCase();

            const ticketArr = state.project.tickets;
            let newTickets = []

            // loop through array to check for the contained string
            for (let i = 0; i < ticketArr.length; i++) {
                let id = ticketArr[i]
                let ticketDetails = ticketArr[i];

                // if the search is in the name or the email of the user, add to object
                if (ticketDetails.title.toLowerCase().includes(search.toLowerCase())) {
                    newTickets.push(ticketDetails);
                }
            }

            // only return array that the page contains
            const numberOfPages = Math.ceil(newTickets.length / itemsPerPage);
            newTickets = newTickets.splice((currentPage - 1) * itemsPerPage, itemsPerPage);

            return { ...state, project: { ...state.project, searchedTickets: newTickets, assignedTicketsNumberOfPages: numberOfPages }}
        }
    },
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

        // Update Users Roles
        builder.addCase(updateUsersRoles.pending, (state) => {
            state.updateUsersRoles.loading = true;
        })
        builder.addCase(updateUsersRoles.fulfilled, (state) => {
            state.updateUsersRoles.loading = false;
        })
        builder.addCase(updateUsersRoles.rejected, (state, action) => {
            state.updateUsersRoles.loading = false;
            state.updateUsersRoles.error = action.payload.message;
        })

        // Delete Users From Project
        builder.addCase(deleteUsersFromProject.pending, (state) => {
            state.deleteUsersFromProject.loading = true;
        })
        builder.addCase(deleteUsersFromProject.fulfilled, (state) => {
            state.deleteUsersFromProject.loading = false;
        })
        builder.addCase(deleteUsersFromProject.rejected, (state, action) => {
            state.deleteUsersFromProject.loading = false;
            state.deleteUsersFromProject.error = action.payload.message;
        })
    }
})

export default projectDetailsSlice.reducer;
export const { searchProjectUsers, searchProjectTickets } = projectDetailsSlice.actions;

