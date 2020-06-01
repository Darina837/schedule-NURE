import React from 'react';
import {NavHashLink} from 'react-router-hash-link';

import './pagination.css';

export default function Pagination({itemsPerPage, totalItems, paginate, group}) {
    const pageNumbers = [];

    for (let i=1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <>
            {pageNumbers.map(numb => (
                <NavHashLink key={numb} onClick={() => paginate(numb)} to={`#${numb}`} activeClassName='active'>{numb}</NavHashLink>
            ))}    
        </>
    )
}