import React from 'react'

const Pagination = ({ productPerPage, totalProducts, paginate, activepage }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalProducts / productPerPage); i++) {
        pageNumbers.push(i)
    }
    return (
        <ul className='default-pagination lab-ul'>
            <li>
                <a href="#" onClick={() => {
                    if (activepage < pageNumbers.length) {
                        paginate(activepage - 1)
                    }
                }}>
                    <i className='icofont-rounded-left'></i>
                </a>
            </li>
            {
                pageNumbers.map((number) => (
                    <li key={number} className={`page-item ${number === activepage ? "bg-warning" : ""}`}>
                        <button onClick={() => paginate(number)} className='bg-transparent'>{number}</button>
                    </li>
                ))
            }

            <li>
                <a href="#" onClick={() => {
                    if (activepage < pageNumbers.length) {
                        paginate(activepage + 1)
                    }
                }}>
                    <i className='icofont-rounded-right'></i>
                </a>
            </li>
        </ul>
    )
}

export default Pagination