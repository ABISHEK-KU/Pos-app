import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import CurrentBillData from './CurrentBillData';
import { addBill } from '../action/billAction';
import '../Styles/CreateBill.css'

const CreateBill = (props) => {
    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState(1)
    const [product, setProduct] = useState('')
    const [form, setform] = useState({ date: '', customer: '', lineItems: [] })
    const { handelToggle } = props

    const data = useSelector((state) => {
        return state
    })

    const customerDetails = [...data.customer.customers].reverse()
    const productDetails = [...data.product.products].reverse()

    const handelDate = (e) => {
        const data = e.target.value
        setform({ ...form, date: data })
    }

    const handelQuantity = (e) => {
        if (e.target.name === 'inc') {
            setQuantity(quantity + 1)
        } else if (e.target.name === 'dec') {
            if (quantity > 1) {
                setQuantity(quantity - 1)
            }
        }
    }

    const handelCustomer = (e) => {
        const data = e.target.value
        setform({ ...form, customer: data })
    }

    const handelProduct = (e) => {
        setProduct(e.target.value)
    }

    const handelDelete = (id) => {
        const billProduct = form.lineItems.filter((e, i) => {
            return id !== i
        })
        setform({ ...form, lineItems: billProduct })
    }

    const handelAdd = (e) => {
        if (product && form.date && form.customer) {
            const items = { product: '', quantity: '' }
            const productData = { ...items, product: product, quantity: quantity }
            setform({ ...form, lineItems: [...form.lineItems, productData] })
            setQuantity(1)
            setProduct('')
        }
    }

    const handelSubmit = (e) => {
        e.preventDefault()
        dispatch(addBill(form, props.history))
        setform({ date: '', customer: '', lineItems: [] })
        handelToggle()
    }
    return (
        <div className='createBillCont'>
            <div className='billForm'>
                <h1>Create Bill</h1>
                <form onSubmit={handelSubmit}>
                    <input className='date' type='date' name='date' onChange={handelDate} value={form.date} />
                    <select onChange={handelCustomer} value={form.customer}>
                        <option value=''>Select Customer</option>
                        {customerDetails.map((e) => {
                            return <option key={e._id} value={e._id}>{e.name}</option>
                        })}
                    </select>
                    <select onChange={handelProduct} value={product}>
                        <option value=''>Select Product</option>
                        {productDetails.map((e) => {
                            return <option key={e._id} value={e._id}>{e.name}</option>
                        })}
                    </select>
                    <br />
                    <div className='qtyControl'>
                        <input className='dec' type='button' value='-' onClick={handelQuantity} name='dec' />
                        <h1 className='display'>{quantity} </h1>
                        <input className='inc' type='button' value='+' onClick={handelQuantity} name='inc' />
                        <input className='add' type='button' value='Add' name='add' onClick={handelAdd} />
                        <input className='billSubmit' type='submit' value='Submit' name='submit' />
                    </div>
                </form>
            </div>
            {form.lineItems.length > 0 && <div>
                <CurrentBillData productDetails={productDetails} form={form} handelDelete={handelDelete} />
            </div>}
        </div>
    )
}

export default CreateBill