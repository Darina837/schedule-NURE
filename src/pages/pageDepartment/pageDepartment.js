import React from 'react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import {Nav} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import {Sugar} from 'react-preloaders';


export default function PageDepartment() {
    const [error, setError] = React.useState(null);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [departments, setDepartments] = React.useState([]);

    React.useEffect( () => {
        window.fetch("http://schedule.dxrk.cc/department/darina")
        .then(res => res.json())
        .then(
            result => {
                let arr = [];
                result.map(res => {
                    if(res.faculty_id === Number(localStorage.getItem('Faculty'))) {
                        arr.push(res);
                        return arr;
                    } else {
                        return null;
                    }
                })
                setIsLoaded(true);
                setDepartments(arr);
            },
            error => {
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
                    <Breadcrumb>
                        <Breadcrumb.Item href="/schedule-faculty">Обрати факультет</Breadcrumb.Item>
                        <Breadcrumb.Item href="/schedule-professor" active>Обрати кафедру</Breadcrumb.Item>
                    </Breadcrumb> 
                    <Nav variant="tabs" defaultActiveKey="link-2">
                        <Nav.Item>
                            <Nav.Link eventKey="link-1" href='/schedule-group/find'>Розклад на групу</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="link-2" href='/schedule-professor'>Розклад на викладача</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <h3>Оберіть кафедру</h3>
                    <ul>
                        {departments.map(department => (
                            <Link to='/schedule-professor/find' className='link' key={department.id}>
                                <li className='faculty-item' title={department.full_name} onClick={() => {
                                    if(localStorage.getItem('Department')) {
                                        localStorage.removeItem('Department');
                                        localStorage.setItem('Department', `${department.id}`);
                                    } else {
                                        localStorage.setItem('Department', `${department.id}`);
                                    }
                                }}>
                                    {department.short_name}
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