import React from 'react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

import Sugar from 'react-preloaders/lib/Sugar/Sugar';
import { Link } from 'react-router-dom';

import Breadcrumb from 'react-bootstrap/Breadcrumb'

export default function PageProfessor() {
    const [error, setError] = React.useState(null);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [professors, setProfessors] = React.useState([]);

    React.useEffect( () => {

        window.fetch("http://schedule.dxrk.cc/teachers/darina")
        .then(res => res.json())
        .then(
            result => {
                let arr = [];
                result.map(res => {
                    if(res.department_id === Number(localStorage.getItem('Department'))) {
                        arr.push(res);
                        return arr;
                    } else {
                        return null;
                    }
                })
                setIsLoaded(true);
                setProfessors(arr);
                const selected = document.querySelector(".selected");
                const optionsContainer = document.querySelector(".options-container");
                const searchBox = document.querySelector(".search-box input");
            
                const optionsList = document.querySelectorAll(".option");
            
                selected.addEventListener("click", () => {
                    optionsContainer.classList.toggle("active");
            
                    searchBox.value = "";
                    filterList("");
            
                    if (optionsContainer.classList.contains("active")) {
                        searchBox.focus();
                    }
                });
            
                optionsList.forEach(o => {
                    o.addEventListener("click", () => {
                        selected.innerHTML = o.querySelector("label").innerHTML;
                        optionsContainer.classList.remove("active");
                    });
                });
            
                searchBox.addEventListener("keyup", function(e) {
                    filterList(e.target.value);
                });
            
                const filterList = searchTerm => {
                    searchTerm = searchTerm.toLowerCase();
                    optionsList.forEach(option => {
                        let label = option.firstElementChild.nextElementSibling.innerText.toLowerCase();
                        if (label.indexOf(searchTerm) !== -1) {
                            option.style.display = "block";
                        } else {
                            option.style.display = "none";
                        }
                    });
                };
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
                <main className='group-content'>
                    <Breadcrumb>
                        <Breadcrumb.Item href="/schedule-faculty">Обрати факультет</Breadcrumb.Item>
                        <Breadcrumb.Item href="/schedule-professor">Обрати кафедру</Breadcrumb.Item>
                        <Breadcrumb.Item active>Обрати викладача</Breadcrumb.Item>
                    </Breadcrumb> 
                    <h3>Оберіть прізвище викладача</h3>


                    <div className="container">

                        <div className="select-box">
                            <div className="options-container">

                                {professors.map(professor => (
                                    <Link to={`/schedule-professor/${professor.full_name}`} className="option" key={professor.id} onClick={() => {
                                        if(localStorage.getItem('Professor')) {
                                            localStorage.removeItem('Professor');
                                            localStorage.setItem('Professor', `${professor.id}`);
                                        } else {
                                            localStorage.setItem('Professor', `${professor.id}`);
                                        }
                                    }}>
                                        <input type="radio" className="radio" id={professor.full_name} name="category" />
                                        <label htmlFor={professor.full_name}>{professor.full_name}</label>
                                    </Link>
                                ))}
                            </div>

                            <div className="selected">
                            Викладач
                            </div>

                            <div className="search-box">
                                <input type="text" placeholder="Почати пошук..." />
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </>
        );    
    }   
}
