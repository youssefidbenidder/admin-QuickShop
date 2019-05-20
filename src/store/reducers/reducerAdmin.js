const initialState = {
    admin : {
        email : "",
        isAdmin : false,
    }
};

const reducerAdmin =  (state = initialState , action) => {
    switch (action.type) {
        case "FETCH_ADMIN":
            console.log("we are here")
            return action.payload || null;
        case "LOGOUT_ADMIN":
            console.log("we logOut")
            return action.payload;
        default:
            return state;
    }
};
export default reducerAdmin;
