const reducer = (tickets = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return action.payload;
        case 'CREATE':
            return tickets;
        default:
            return tickets;
    }
};

export default reducer;