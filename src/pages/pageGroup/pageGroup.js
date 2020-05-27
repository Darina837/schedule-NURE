import React from 'react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import {Nav} from 'react-bootstrap';
import './pageGroup.css';
import Sugar from 'react-preloaders/lib/Sugar/Sugar';
import { Link } from 'react-router-dom';



export default function PageGroup() {
    const [error, setError] = React.useState(null);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [groups, setGroups] = React.useState([]);

    React.useEffect( () => {

        window.fetch("http://schedule.dxrk.cc/groups/darina")
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
                setGroups(arr);
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
                    <Nav variant="tabs" defaultActiveKey="link-1">
                        <Nav.Item>
                            <Nav.Link eventKey="link-1">Розклад на групу</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="link-2" href='/schedule-professor'>Розклад на викладача</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <h3>Оберіть групу</h3>


                    <div className="container">

                        <div className="select-box">
                            <div className="options-container">

                                {groups.map(group => (
                                    <Link to={`/schedule-group/${group.name}`} className="option" key={group.id} onClick={() => {
                                        if(localStorage.getItem('Group')) {
                                            localStorage.removeItem('Group');
                                            localStorage.setItem('Group', `${group.id}`);
                                        } else {
                                            localStorage.setItem('Group', `${group.id}`);
                                        }
                                    }}>
                                        <input type="radio" className="radio" id={group.name} name="category" />
                                        <label htmlFor={group.name}>{group.name}</label>
                                    </Link>
                                ))}
                            </div>

                            <div className="selected">
                            Група
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
