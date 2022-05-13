import React from 'react'
import '../Styles/CurrentBillData.css'

const CurrentBillData = (props) => {

    const { productDetails, form, handelDelete } = props

    return (
        <table>
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total Price</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {form.lineItems.length > 0 && form.lineItems.map((e, i) => {
                    const data = productDetails.filter((ele) => {
                        return (ele._id === e.product)
                    })

                    return (
                        <tr key={`product${i}`}>
                            <td>{data[0].name}</td>
                            <td>{e.quantity}</td>
                            <td>{data[0].price}</td>
                            <td>{Number(data[0].price * e.quantity)}</td>
                            <td><button className='delete' onClick={() => { handelDelete(i) }}>Delete</button></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}
export default CurrentBillData