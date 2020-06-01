import React from 'react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import {Button} from 'react-bootstrap';

import calendar from '../../media/calendar.png';

import {BsArrowRight} from 'react-icons/bs';

import './pageMain.css';
import { Link } from 'react-router-dom';
    
export default function PageMain() {
    return (
        <>
            <Header />
            <main className='main-content'>
                <img src={calendar} alt='' data-aos="zoom-in" data-aos-easing="linear" data-aos-duration="1000" />
                <Link to='/schedule-faculty' data-aos="flip-up" data-aos-easing="linear" data-aos-duration="1000"><Button variant="primary">Перейти до розкладу <BsArrowRight /></Button></Link>
            </main>
            <Footer />
        </>
    )
}