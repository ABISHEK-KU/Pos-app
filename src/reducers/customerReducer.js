const intialStatus = { customers: [] }

const customerReducer = (state = intialStatus, action) => {
    switch (action.type) {
        case ('CUSTOMER_LIST'): {
            return { ...state, customers: action.payload }
        }
        case ('CREATE_CUSTOMER'): {
            return { ...state, customers: [...state.customers, action.payload] }
        }
        case ('UPDATE_CUSTOMER'): {
            const update = state.customers.map((e) => {
                if (action.payload._id === e._id) {
                    return action.payload
                } else {
                    return e
                }
            })
            return { ...state, customers: update }
        }
        case ('DELETE_CUSTOMER'): {
            const deleting = state.customers.filter((e) => {
                return e._id !== action.payload._id
            })
            return { ...state, customers: deleting }
        }
        default: {
            return { ...state }
        }
    }
}
export default customerReducer