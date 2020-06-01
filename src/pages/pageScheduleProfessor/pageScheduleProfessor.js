import React from 'react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

import Sugar from 'react-preloaders/lib/Sugar/Sugar';

import cat from '../../media/cat.gif';

import {GiSpellBook} from 'react-icons/gi';
import {FaUser} from 'react-icons/fa';
import {MdLocationOn} from 'react-icons/md';

import 'react-dates/initialize';
import {DateRangePicker} from 'react-dates';
import 'moment/locale/ru';
import moment from 'moment';
import Pagination from '../../components/pagination/pagination';

import Breadcrumb from 'react-bootstrap/Breadcrumb'

export default function PageScheduleProfessor(props) {

    const [error, setError] = React.useState(null);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [allDates, setAllDates] = React.useState([]);

    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);
    const [focusedInput, setFocusedInput] = React.useState(null);

    const [times, setTimes] = React.useState(null);

    const [currentPage, setCurrentPage] = React.useState(1);
    const [itemsPerPage] = React.useState(1);

    let finalArray = [];

    let arr = [];

    if(startDate && endDate) {
        arr.push(moment(startDate).format('YYYY-MM-DD'));
        let enumerateDaysBetweenDates = function(startDate, endDate) {
            let currDate = moment(startDate).startOf('day');
            let lastDate = moment(endDate).startOf('day');
         
            while(currDate.add(1, 'd').diff(lastDate) < 0) {
                arr.push(currDate.clone().format('YYYY-MM-DD'));
            }
            arr.push(moment(endDate).format('YYYY-MM-DD'));
            
        };
        enumerateDaysBetweenDates(startDate, endDate)
    }

    fetch("http://schedule.dxrk.cc/time/darina") 
    .then(res => res.json())
    .then(result => {
        
        let count = 1;
        let arr = [];
        result.forEach(elem => {
            arr.push({id: count++, time: `${elem.time_start}-${elem.time_end}`});
        })
        setTimes(arr);
    })

    React.useEffect( () => {
        fetch("http://schedule.dxrk.cc/classes/darina")
        .then(res => res.json())
        .then(
            result => {
                let data = [];

                result.forEach( elem => {
                    if(elem.teacher_id !== Number(localStorage.getItem('Professor'))) { //не совпало с айди группой
                        return null;
                    } else { //совпало с айди группой
                        
                        if(data.find(el => el.date === elem.date)) { //уже есть дата (в одну дату несколько занятий)
                            let subject = {
                                Subject: null,
                                Auditory: null,
                                Time: {start: null, end: null},
                                idTime: null,
                                Group: null,
                                Teacher: null,
                                Type: null
                            };

                            fetch("http://schedule.dxrk.cc/subjects/darina") //поиск предмета
                            .then(res => res.json())
                            .then(
                                result => {
                                    result.forEach(item => {
                                        if(item.id === elem.subject_id) {
                                            subject.Subject = item.short_name;
                                        }
                                    })
                                }
                            ) 
                            fetch("http://schedule.dxrk.cc/auditories/darina") //поиск аудитории
                            .then(res => res.json())
                            .then(
                                result => {
                                    result.forEach(item => {
                                        if(item.id === elem.auditory_id) {
                                            subject.Auditory = item.name;
                                        }
                                    })
                                }
                            ) 
                            fetch("http://schedule.dxrk.cc/time/darina") //поиск времени
                            .then(res => res.json())
                            .then(
                                result => {
                                    result.forEach(item => {
                                        if(item.id === elem.class_time_id) {
                                            subject.Time.start = item.time_start;
                                            subject.Time.end = item.time_end;
                                            subject.idTime = item.id;
                                        }
                                    })
                                }
                            )  
                            fetch("http://schedule.dxrk.cc/groups/darina") //поиск группы
                            .then(res => res.json())
                            .then(
                                result => {
                                    result.forEach(item => {
                                        if(item.id === elem.group_id) {
                                            subject.Group = item.name;
                                        }
                                    })
                                }
                            ) 
                            fetch("http://schedule.dxrk.cc/teachers/darina") //поиск преподавателя
                            .then(res => res.json())
                            .then(
                                result => {
                                    result.forEach(item => {
                                        if(item.id === elem.teacher_id) {
                                            subject.Teacher = item.short_name;
                                        }
                                    })
                                }
                            )       
                            fetch("http://schedule.dxrk.cc/types/darina") //поиск типа
                            .then(res => res.json())
                            .then(
                                result => {
                                    result.forEach(item => {
                                        if(item.id === elem.type_id) {
                                            subject.Type = item.short_name;
                                            subject.idType = item.id;
                                        }
                                    })
                                }
                            )                                
                            let item = data.find(el => el.date === elem.date);
                            item.subjects.push(subject);


                        } else { //дата записывается впервые
                            let date = elem.date;
                            let subjects = [];
                            let subject = {
                                Subject: null,
                                Auditory: null,
                                Time: {start: null, end: null},
                                idTime: null,
                                Group: null,
                                Teacher: null,
                                Type: null,
                                idType: null
                            };
                            fetch("http://schedule.dxrk.cc/subjects/darina") //поиск предмета
                            .then(res => res.json())
                            .then(
                                result => {
                                    result.forEach(item => {
                                        if(item.id === elem.subject_id) {
                                            subject.Subject = item.short_name;
                                        }
                                    })
                                }
                            )   
                            fetch("http://schedule.dxrk.cc/auditories/darina") //поиск аудитории
                            .then(res => res.json())
                            .then(
                                result => {
                                    result.forEach(item => {
                                        if(item.id === elem.auditory_id) {
                                            subject.Auditory = item.name;
                                        }
                                    })
                                }
                            )   
                            fetch("http://schedule.dxrk.cc/time/darina") //поиск времени
                            .then(res => res.json())
                            .then(
                                result => {
                                    result.forEach(item => {
                                        if(item.id === elem.class_time_id) {
                                            subject.Time.start = item.time_start;
                                            subject.Time.end = item.time_end;
                                            subject.idTime = item.id;
                                        }
                                    })
                                }
                            )      
                            fetch("http://schedule.dxrk.cc/groups/darina") //поиск группы
                            .then(res => res.json())
                            .then(
                                result => {
                                    result.forEach(item => {
                                        if(item.id === elem.group_id) {
                                            subject.Group = item.name;
                                        }
                                    })
                                }
                            )      
                            fetch("http://schedule.dxrk.cc/teachers/darina") //поиск преподавателя
                            .then(res => res.json())
                            .then(
                                result => {
                                    result.forEach(item => {
                                        if(item.id === elem.teacher_id) {
                                            subject.Teacher = item.short_name;
                                        }
                                    })
                                }
                            )     
                            fetch("http://schedule.dxrk.cc/types/darina") //поиск типа
                            .then(res => res.json())
                            .then(
                                result => {
                                    result.forEach(item => {
                                        if(item.id === elem.type_id) {
                                            subject.Type = item.short_name;
                                            subject.idType = item.id;
                                        }
                                    })
                                }
                            )                 
                            subjects.push(subject);
                            data.push({date: date, subjects: subjects});
                        }    
                    }
                    
                } )
                setIsLoaded(true);
                setAllDates(data);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
            )
    }, [] ) 

    if(allDates.length > 0 && arr.length > 0) {
        arr.forEach(item => {
            if(allDates.find(el => el.date === item)) {
                let obj = allDates.find(el => el.date === item);
                finalArray.push(obj);
            } else {
                let obj = {date: item, subjects: []};
                finalArray.push(obj);
            }
        })
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItem = finalArray.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);



    if(document.querySelector('.type-1')) {
        for(let i of document.querySelectorAll('.type-1')) {
            i.classList.add('lk')
        }
    }

    if(document.querySelector('.type-2')) {
        for(let i of document.querySelectorAll('.type-2')) {
            i.classList.add('pz')
        }
    }

    if(document.querySelector('.type-3')) {
        for(let i of document.querySelectorAll('.type-3')) {
            i.classList.add('lb')
        }
    }

    if(document.querySelector('.type-4')) {
        for(let i of document.querySelectorAll('.type-4')) {
            i.classList.add('cons')
        }
    }

    if(document.querySelector('.type-5')) {
        for(let i of document.querySelectorAll('.type-5')) {
            i.classList.add('zal')
        }
    }

    if(document.querySelector('.type-6')) {
        for(let i of document.querySelectorAll('.type-6')) {
            i.classList.add('isp')
        }
    }


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
        )
    } else {
        return (
            <>
                <Header />
                <main className='scheduleGroup-content'>
                    <div className='header-schedule'>
                        <DateRangePicker
                            startDate={startDate} 
                            startDateId="your_unique_start_date_id" 
                            endDate={endDate} 
                            endDateId="your_unique_end_date_id" 
                            onDatesChange={({ startDate, endDate }) => {setStartDate(startDate); setEndDate(endDate)}} 
                            focusedInput={focusedInput} 
                            onFocusChange={focusedInput => setFocusedInput(focusedInput)} 
                            firstDayOfWeek={1}
                            startDatePlaceholderText='Початок'
                            endDatePlaceholderText='Кінець'
                            withPortal={true}
                            hideKeyboardShortcutsPanel={true}
                            displayFormat='DD/MM/yyyy'
                        />  
                        <Breadcrumb>
                            <Breadcrumb.Item href="/schedule-faculty">Обрати факультет</Breadcrumb.Item>
                            <Breadcrumb.Item href="/schedule-professor">Обрати кафедру</Breadcrumb.Item>
                            <Breadcrumb.Item href='/schedule-professor/find'>Обрати викладача</Breadcrumb.Item>
                            <Breadcrumb.Item active>Розклад</Breadcrumb.Item>
                        </Breadcrumb>  
                    </div>
                    
                    {finalArray.length > 0 ? currentItem.map(el => (
                        <>
                            <table border="1">
                                <thead>
                                    <tr>
                                        <th>Час занять</th>
                                        <th>{moment(el.date).format('DD.MM.YYYY')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {el.subjects.length > 0 ? times.map( item => (
                                        <tr>
                                            <td>{item.time}</td>
                                            <td className={el.subjects.find(e => e.idTime === item.id) ? `type-${el.subjects.find(e => e.idTime === item.id).idType}` : null}>{el.subjects.find(e => e.idTime === item.id) ? 
                                            <>
                                                <GiSpellBook />{el.subjects.find(e => e.idTime === item.id).Subject}
                                                <br/>
                                                <FaUser />{el.subjects.find(e => e.idTime === item.id).Group}
                                                <br/>
                                                <MdLocationOn />{el.subjects.find(e => e.idTime === item.id).Auditory}
                                                <br/>
                                                {el.subjects.find(e => e.idTime === item.id).Type}
                                            </> : null}</td>
                                        </tr>
                                    ) ) : <tr>
                                            <td><img src={cat} alt='' /></td>
                                            <td>Вихідний!!!</td>
                                        </tr>}
                                        
                                </tbody>                                
                            </table>
                            <br/>
                            <br/>
                        </>
                    )) : null}

                    {finalArray.length > 0 ? 
                        <table>
                            <thead>
                                <tr>
                                    <th className='lk'>Лекція</th>
                                    <th className='pz'>Практичне заняття</th>
                                    <th className='lb'>Лабораторна робота</th>
                                    <th className='cons'>Консультація</th>
                                    <th className='zal'>Залік</th>
                                    <th className='isp'>Іспит</th>
                                </tr>
                            </thead>
                        </table>
                    : null}

                    {finalArray.length > 0 ? 
                    <div className='pagination'>
                        <Pagination itemsPerPage={itemsPerPage} totalItems={finalArray.length} paginate={paginate} group={props.match.params.group} />
                    </div>
                    : null}
                </main>
                <Footer />
            </>
        );    
    }
}