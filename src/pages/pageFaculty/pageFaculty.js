import React from 'react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import {Nav} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './pageFaculty.css';

import {Sugar} from 'react-preloaders';

export default function PageFaculty() {
    const [error, setError] = React.useState(null);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [faculties, setFaculties] = React.useState([]);

    React.useEffect( () => {
        window.fetch("http://schedule.dxrk.cc/faculties/darina")
        .then(res => res.json())
        .then(
            result => {
                setIsLoaded(true);
                setFaculties(result);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
    }, [] )

    if(error) {
        return <div>Ошибка: {error.message}</div>
    } else if(!isLoaded) {
        return (
            <>
                <Header />
                <main>
                    <Sugar color='#1069a5' time={1800} animation="slide-down" />     
                </main>  
                <Footer />
            </>
        );
    } else {
        return (
            <>
                <Header />
                <main className='faculty-content'>
                    <Nav variant="tabs" defaultActiveKey="link-1">
                        <Nav.Item>
                            <Nav.Link eventKey="link-1">Розклад на групу</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="link-2" href='/schedule-professor'>Розклад на викладача</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <h3>Оберіть факультет</h3>
                    <ul>
                        {faculties.map(faculty => (
                            <Link to='/schedule-group/find' className='link'>
                                <li className='faculty-item' key={faculty.id} title={faculty.full_name} onClick={() => {
                                    if(localStorage.getItem('Faculty')) {
                                        localStorage.removeItem('Faculty');
                                        localStorage.setItem('Faculty', `${faculty.id}`);
                                    } else {
                                        localStorage.setItem('Faculty', `${faculty.id}`);
                                    }
                                }}>
                                    {faculty.short_name}
                                </li>
                            </Link>
                        ))}
                    </ul>
                </main>
                <Footer />
            </>
        )
    }
}