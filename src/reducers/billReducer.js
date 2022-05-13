const intialState = { bills: [], selectedBill: {} }

const billReducer = (state = intialState, action) => {
    switch (action.type) {
        case ('BILL_LIST'): {
            return { ...state, bills: action.payload }
        }
        case ('ADD_BILL'): {
            return { ...state, bills: [...state.bills, action.payload] }
        }
        case ('DELETE_BILL'): {
            const deleteBill = state.bills.filter((e) => {
                return e._id !== action.payload._id
            })
            return { ...state, bills: deleteBill }
        }
        case ('SELECT_BILL'): {
            return { ...state, selectedBill: action.payload }
        }
        default: {
            return { ...state }
        }
    }
}
export default billReducer