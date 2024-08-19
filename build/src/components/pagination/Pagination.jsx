import React from 'react';
import ReactPaginate from "react-paginate";
import classes from "./pagination.module.css";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
var Pagination = function (_a) {
    var setItemOffset = _a.setItemOffset, itemsPerPage = _a.itemsPerPage, reviews = _a.reviews;
    var handlePageClick = function (event) {
        var newOffset = (event.selected * itemsPerPage) % (reviews === null || reviews === void 0 ? void 0 : reviews.length);
        setItemOffset(newOffset);
    };
    return (<ReactPaginate nextClassName={"".concat(classes.item, " ").concat(classes.nextArrow)} previousClassName={"".concat(classes.item, " ").concat(classes.previousArrow)} pageClassName={"".concat(classes.item)} activeClassName={"".concat(classes.item, " ").concat(classes.active)} breakClassName={"".concat(classes.item)} containerClassName={"".concat(classes.pagination)} breakLabel="..." previousLabel={<AiOutlineArrowLeft size={25}/>} nextLabel={<AiOutlineArrowRight size={25}/>} onPageChange={handlePageClick} pageRangeDisplayed={3} pageCount={(reviews === null || reviews === void 0 ? void 0 : reviews.length) / itemsPerPage} renderOnZeroPageCount={null}/>);
};
export default Pagination;
