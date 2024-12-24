import { useState, useEffect , useCallback } from "react";

import Pagination from "../component/Pagination";

/**
 * @param {number} size 페이지가 보여질 수
 */
const usePagination = (size) => {

    /** @type {number} 현재 페이지 */
    const [ currPage, setCurrPage ] = useState(0);
    
    /** @type {array} 화면에 보여질 페이지 */
    const [paginationList, setPaginationList] = useState([]);

    /** @type {number} 전체 페이지 수 */
    const [paginationTotal, setPaginationTotal] = useState(0);

    /** @type {number} 현재 페이지 인덱스 번호 */
    const [paginationIdx, setPaginationIdx] = useState(0);

    /**
     * 배열을 나눠서 저장 
     * @param {array} data 게시물을 담은 배열 
     * @param {number} size 몇개로 나눠서 저장할지
     * 
     * @returns {array}
     */
     const chunk = (data = [], size = 1) => {
        if(data == null){
            return []
        }
        else {
            const arr = [];
                    
            for (let i = 0; i < data.length; i += size) {
                arr.push(data.slice(i, i + size));
            }
        
            return arr;
        }
    }

    const listPagination = useCallback((length,size)=>{
        let arr = []
        for(let i=0; i<length; i++){
            arr.push(i);
        }

        
        return chunk(arr, size)

    },[])

    /** 
     * 클릭한 페이지로 이동
     * @param {eventTarget} e 
     */
    const moveToPage = (e) => {
        let self = e.currentTarget;

        let value = Number(self.value);

        setCurrPage(value);
        
    }

    // /** 현재페이지 + size 만큼 이동 */
    // const nextChapter = () => {

    //     let nenext = (currPage+size) > paginationTotal ? paginationTotal : (currPage+size);

    //     setCurrPage(nenext);
    // }

    /** 현재 페이지 + 1 만큼 이동 */
    const nextPage = () => {

        let next = currPage + 1;

        if(next > paginationTotal) next = paginationTotal;

        setCurrPage(next);
    }

    // /** 현재페이지 - size 만큼 이동 */
    // const prevChapter = () => {
    //     let prprev = (currPage-size) < 0 ? 0 : (currPage-size);
        
    //     setCurrPage(prprev);
        
    // }

    /** 현재페이지 - 1 만큼 이동 */
    const prevPage = () => {
        let prev = currPage-1;

        if(prev <= 0) prev = 0;
        
        setCurrPage(prev);
        
    }

    /** 맨 마지막 페이지로 이동 */
    const lastPage = () => {
        setCurrPage(paginationTotal);
    }

    /** 맨 처음 페이지로 이동 */
    const firstPage = () => {
        setCurrPage(0);
    }

    /** @param {number} total 전체 게시물 수 */
    const changePaginationTotal = (total) => {

        setPaginationTotal(Math.ceil(total/size)-1);
    }

    const changePaginationList = (total) => {

        const listArrNo = Math.ceil(total/size);

        setPaginationList(listPagination(listArrNo, size));
    }

    useEffect(() => {
        setPaginationIdx(Math.floor(currPage /size));
    },[currPage, setPaginationIdx, size]);

    /** @type {component} */
    const PaginationElement = () => {
        if(paginationTotal <= 0) return

        return <Pagination 
                    idx={paginationIdx} 
                    list={paginationList} 
                    page={currPage} 
                    total={paginationTotal} 
                    moveToPage={moveToPage} 
                    nextChapter={nextPage} 
                    lastPage={lastPage}
                    prevChapter={prevPage} 
                    firstPage={firstPage} 
                    viewLength={size}
                />
    }

    return {
        PaginationElement, 
        changePaginationTotal, 
        changePaginationList,
        setCurrPage,
        currPage
    }
}

export default usePagination