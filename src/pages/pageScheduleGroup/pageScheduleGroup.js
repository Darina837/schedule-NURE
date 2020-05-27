import React from 'react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

import './pageScheduleGroup.css';
import Sugar from 'react-preloaders/lib/Sugar/Sugar';

import {GiSpellBook} from 'react-icons/gi';
import {FaUser} from 'react-icons/fa';
import {MdLocationOn} from 'react-icons/md';

function Month(props) {
    let year = props.year;
    let month = props.month;
    let current = new Date(year, month);
    let next = new Date(year, month+1);
    let diff = (next - current)/(1000 * 3600 * 24);

    let indexDay = (current.getDay() + 6) % 7;

    const ROWS = Math.ceil((indexDay + diff)/7);
    const COLS = 7;

    let table = [];
    let tr;
    let numb = 1 - indexDay;
    for(let i = 0; i < ROWS; i++) {
        tr = [];
        for(let j = 0; j < COLS; j++) {
            tr.push(<td>{numb > 0 && numb <= diff ? numb : ''}</td>);
            numb++;
        }
        table.push(<tr>{tr}</tr>)
    }

    return <table border='1'>
        {table}
    </table>
}

export default function PageScheduleGroup() {
    const [error, setError] = React.useState(null);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [dates, setDates] = React.useState([]);

    let date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();

    React.useEffect( () => {
        window.fetch("http://schedule.dxrk.cc/classes/darina")
        .then(res => res.json())
        .then(
            result => {
                let data = [];
                result.forEach( elem => {
                    if(elem.group_id !== Number(localStorage.getItem('Group'))) {
                        return null;
                    } else {
                        if(data.find(el => el.date === elem.date)) {
                            let subject = {
                                idSubject: elem.subject_id,
                                idAuditory: elem.auditory_id,
                                idTime: elem.class_time_id,
                                idGroup: elem.group_id,
                                idTeacher: elem.teacher_id,
                                idType: elem.type_id
                            };
                            let item = data.find(el => el.date === elem.date);
                            item.subjects.push(subject);
                        } else {
                            let date = elem.date;
                            let subjects = [];
                            let subject = {
                                idSubject: elem.subject_id,
                                idAuditory: elem.auditory_id,
                                idTime: elem.class_time_id,
                                idGroup: elem.group_id,
                                idTeacher: elem.teacher_id,
                                idType: elem.type_id
                            };
                            subjects.push(subject);
                            data.push({date: date, subjects: subjects});
                        }    
                    }
                    
                } )
                setIsLoaded(true);
                setDates(data);
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
        )
    } else {
        return (
            <>
                <Header />
                <main className='scheduleGroup-content'>
                    <table border="1">
                            <thead>
                                <tr>
                                    <td> </td>
                                    <th>ПОНЕДІЛОК<br/>08.06</th>
                                    <th>ВІВТОРОК<br/>09.06</th>
                                    <th>СЕРЕДА<br/>10.06</th>
                                    <th>ЧЕТВЕР<br/>11.06</th>
                                    <th>П'ЯТНИЦЯ<br/>12.06</th>
                                    <th>СУБОТА<br/>13.06</th>
                                </tr>
                                <tr>
                                    <td>07:45 - 09:20</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td className='isp'><GiSpellBook/>КСх<br/><FaUser/>Корабльов М.М.<br/><MdLocationOn/>229</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>09:30 - 11:05</td>
                                    <td></td>
                                    <td></td>
                                    <td className='zal'><GiSpellBook/>ПнтJ<br/><FaUser/>Борисенко В.П.<br/><MdLocationOn/>34з</td>
                                    <td></td>
                                    <td className='isp'><GiSpellBook/>КСх<br/><FaUser/>Корабльов М.М.<br/><MdLocationOn/>229</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>11:15 - 12:50</td>
                                    <td></td>
                                    <td></td>
                                    <td className='zal'><GiSpellBook/>МPython<br/><FaUser/>Ляшенко О.С.<br/><MdLocationOn/>350</td>
                                    <td className='cons'><GiSpellBook/>КСх<br/><FaUser/>Корабльов М.М.<br/><MdLocationOn/>229</td>
                                    <td className='isp'><GiSpellBook/>КСх<br/><FaUser/>Корабльов М.М.<br/><MdLocationOn/>229</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>13:10 - 14:45</td>
                                    <td></td>
                                    <td className='zal'><GiSpellBook/>ІТех<br/><FaUser/>Іващенко Г.С.<br/><MdLocationOn/>37з</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>14:55 - 16:30</td>
                                    <td></td>
                                    <td className='zal'><GiSpellBook/>*ІС<br/><FaUser/>Жидкова О.О.<br/><MdLocationOn/>150</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>16:40 - 18:15</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </thead>
                        </table>    
                    
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

                        {/* <Month year={year} month={month} /> */}
                </main>
                <Footer />
            </>
        );    
    }
    
}