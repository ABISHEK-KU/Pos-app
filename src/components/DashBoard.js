import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Chart } from "react-google-charts";
import '../Styles/DashBoard.css';

const DashBoard = (props) => {
    const [salesData, setSalesData] = useState([])

    const appData = useSelector((state) => {
        return state
    })

    const customerData = [...appData.customer.customers].reverse()
    const productData = [...appData.product.products].reverse()
    const billdata = [...appData.bill.bills].reverse()
    const date = ((new Date().getDate() + '').length === 1) ? 0 + (new Date().getDate() + '') : (new Date().getDate() + '')
    const month = (((new Date().getMonth() + 1) > 10 ? '' : '0') + (new Date().getMonth() + 1))
    const year = new Date().getFullYear()


    const todayBill = billdata.map((e) => {
        if (`${e.date.slice(0, 10).split('-').reverse().join('-')}` === `${date}-${month}-${year}`) {
            return e.total
        } else {
            return 0
        }
    })

    useEffect(() => {
        const salesCopy = billdata.map((e) => {
            return [e.date.slice(0, 10).split('-').reverse().join('-'), e.total]
        })
        const data = []
        salesCopy.map((e) => {
            const filterData = salesCopy.filter((ele) => {
                return e[0] === ele[0]
            })
            if (filterData.length > 1) {
                const amount = filterData.reduce((a, b) => a[1] + b[1])
                const combinedData = [filterData[0][0], amount]
                if (data.length === 0) {
                    data.push(combinedData)
                } else {
                    const checkData = data.filter((d) => {
                        return d[0] === filterData[0][0]
                    })
                    if (checkData.length === 0) {
                        data.push(combinedData)
                    }
                }
            } else {
                data.push(filterData[0])
            }
            return data
        })
        setSalesData(data.slice(0, 10))
    }, [appData])

    const data = [
        ["Date", "Sales"],
        ...salesData,
    ];
    const options = {
        chart: {
            title: "Daily Sales",
            subtitle: "Daily Store Sales",
        },
    };

    return (
        <div>
            <div>
                <div className='dashboard'>
                    <h1>DashBoard</h1>
                    <div className='statCont'>
                        <div className='stat'>
                            <h1>No.Customers</h1>
                            <h3>{customerData.length}</h3>
                        </div>
                        <div className='stat'>
                            <h1>No.products</h1>
                            <h3>{productData.length}</h3>
                        </div>
                        <div className='stat'>
                            <h1>No.bills</h1>
                            <h3>{billdata.length}</h3>
                        </div>
                        <div className='stat'>
                            <h1>Today Sales</h1>
                            <h3>{todayBill.reduce((a, b) => a + b, 0)}</h3>
                        </div>
                    </div>
                </div>
            </div>
            <br/>
            <div className='recentDetails'>
                <div className="flex-container">
                    <div className="modal">
                        <div className="modal-header">
                            <h2>Recent Customers</h2>
                        </div>
                        <div className="modal-body">
                            {customerData.map((e, i) => {
                                if (i <= 4) {
                                    return <p key={`customer${i}`}>{e.name}</p>
                                }
                            })}
                        </div>
                    </div>
                    <div className="modal">
                        <div className="modal-header">
                            <h2>Recent Products</h2>
                        </div>
                        <div className="modal-body">
                            {productData.map((e, i) => {
                                if (i <= 4) {
                                    return <p key={`product${i}`}>{e.name}</p>
                                }
                            })}
                        </div>
                    </div>
                    <div className="modal">
                        <div className="modal-header">
                            <h2>Recent Bills</h2>
                        </div>
                        <div className="modal-body">
                            {billdata.map((e, i) => {
                                for (let j = 0; j < customerData.length; j++) {
                                    if (i < 5) {
                                        if (e.customer === customerData[j]._id) {
                                            return <p key={`billData${i}`}>{`${customerData[j].name}-${e.total}`}</p>
                                        }
                                    }
                                }
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div className='chart'>
                <Chart
                    chartType="Bar"
                    width="90%"
                    height="400px"
                    data={data}
                    options={options}
                />
            </div>
        </div>
    )
}
export default DashBoard