import React from 'react';
import ReactPaginate from "react-paginate";
import classes from "./pagination.module.css";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
const Pagination = ({ setItemOffset, itemsPerPage, reviews }) => {
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % (reviews === null || reviews === void 0 ? void 0 : reviews.length);
        setItemOffset(newOffset);
    };
    return (<ReactPaginate nextClassName={`${classes.item} ${classes.nextArrow}`} previousClassName={`${classes.item} ${classes.previousArrow}`} pageClassName={`${classes.item}`} activeClassName={`${classes.item} ${classes.active}`} breakClassName={`${classes.item}`} containerClassName={`${classes.pagination}`} breakLabel="..." previousLabel={<AiOutlineArrowLeft size={25}/>} nextLabel={<AiOutlineArrowRight size={25}/>} onPageChange={handlePageClick} pageRangeDisplayed={3} pageCount={(reviews === null || reviews === void 0 ? void 0 : reviews.length) / itemsPerPage} renderOnZeroPageCount={null}/>);
};
export default Pagination;
