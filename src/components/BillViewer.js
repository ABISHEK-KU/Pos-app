import React from 'react'
import { useSelector } from 'react-redux';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import '../Styles/BillViewer.css'

const BillViewer = (props) => {
    const { id } = props.match.params
    const data = useSelector((state) => {
        return state
    })

    const userData = data.user.account
    const customerData = data.customer.customers
    const productData = data.product.products
    const selectedBillData = data.bill.selectedBill

    const customer = customerData.filter((e) => {
        return id === e._id
    })

    const printDocument = () => {
        html2canvas(document.getElementById('bill')).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("portrait", "mm", "a4");
            pdf.addImage(imgData, "JPEG", 0, 0);
            pdf.save("download.pdf");
        });
    };

    return (
        <div >
            <button className='update' onClick={printDocument}>Print</button>
            <div id='bill'>
                <div>
                    <div className='seller'>
                        <h3>Seller</h3>
                        <h1>{userData.businessName}</h1>
                        <p>{userData.username}</p>
                        <p>{userData.address}</p>
                        <p>{userData.email}</p>
                    </div>
                    <div className='buyer'>
                        <h3>Buyer</h3>
                        <h1>{customer[0].name && customer[0].name}</h1>
                        <p>{customer[0].email}</p>
                        <p>{customer[0].mobile}</p>
                    </div>
                    <div className='billdate'>
                        <p><b>Date:</b>{selectedBillData.date.slice(0, 10).split('-').reverse().join('-')}</p>
                    </div>
                </div>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Product</th>
                                <th>Qty</th>
                                <th>Price</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedBillData.lineItems.map((e, i) => {
                                const buyingProducts = productData.filter((ele) => {
                                    return e.product === ele._id
                                })

                                return (
                                    <tr key={i + 1}>
                                        <td>{i + 1}</td>
                                        <td>{buyingProducts[0].name}</td>
                                        <td>{e.quantity}</td>
                                        <td>{e.price}</td>
                                        <td>{e.subTotal}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={4}>Total Amount</td>
                                <td>{selectedBillData.total}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default BillViewer