import * as api from '../api';

// Action Creators. actions that return actions.

export const getTickets = () => async (dispatch) => { // this is because of redux thunk
    try {
        const { data } = await api.fetchTickets()

        dispatch({ type: 'FETCH_ALL', payload: data })
    } catch (error) {
        console.log(error.message)
    }



    const action = { type: 'FETCH_ALL', payload: []};

    dispatch(action);
}

