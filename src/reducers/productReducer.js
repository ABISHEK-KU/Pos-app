const intialState = { products: [] }

const productReducer = (state = intialState, action) => {
    switch (action.type) {
        case ('PRODUCT_LIST'): {
            return { ...state, products: action.payload }
        }
        case ('CREATE_PRODUCT'): {
            return { ...state, products: [...state.products, action.payload] }
        }
        case ('UPDATE_PRODUCT'): {
            const update = state.products.map((e) => {
                if (action.payload._id === e._id) {
                    return action.payload
                } else {
                    return e
                }
            })
            console.log(update)
            return { ...state, products: update }
        }
        case ('DELETE_PRODUCT'): {
            const deleteProduct = state.products.filter((e) => {
                return e._id !== action.payload._id
            })
            return { ...state, products: deleteProduct }
        }
        default: {
            return { ...state }
        }
    }
}
export default productReducer