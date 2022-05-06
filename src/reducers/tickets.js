const reducer = (tickets = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return tickets;
        case 'CREATE':
            return tickets;
        default:
            return tickets;
    }
};

export default reducer;