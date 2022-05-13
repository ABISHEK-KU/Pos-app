const intialStatus = { account: {} }

const userReducer = (state = intialStatus, action) => {
    switch (action.type) {
        case ('LOG_OUT'): {
            return { ...state, account:{}}
        }
        case ('USER_DETAILS'): {
            return { ...state, account: action.payload }
        }
        default: {
            return { ...state }
        }
    }
}
export default userReducer