import React from 'react';
import '../Styles/Home.css';
import BillApp from '../image/BillApp.jpg'

const Home = (props) => {

    return (
        <div className='title'>
            <img className='billAppImage' src={BillApp} alt='billAppBackGround' />
        </div>
    )
}
export default Home