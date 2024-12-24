import btnNext from "../img/btnNext.svg"
import btnPrev from "../img/btnPrev.svg"
import btnNextet from "../img/btnNextet.svg"
import btnPrevev from "../img/btnPrevev.svg"

const Pagination = ({
    idx,
    list,
    page,
    moveToPage,
    total,
    nextChapter,
    lastPage,
    prevChapter,
    firstPage,
    viewLength
}) => {
    return (
        <div className="pagination">
            <button className="btnPrevev" onClick={firstPage}>
                <img src={btnPrevev} alt="" />
            </button>
            <button className="btnPrev" onClick={prevChapter}>
                <img src={btnPrev} alt="" />
            </button>

            <ol className="list">
                {list[idx]
                    ? list[idx].map((el, idx) => {
                          return (
                              <li key={idx}>
                                  <button
                                      className={page === el ? "on" : ""}
                                      value={el}
                                      onClick={moveToPage}
                                  >
                                      {el + 1}
                                  </button>
                              </li>
                          );
                      })
                    : null}
            </ol>
            {/* {page === total ? null : (
                <>
                    <button onClick={nextChapter}>
                        <img src={btnNext} alt="" />
                    </button>
                    <button onClick={lastPage}>
                    <img src={btnNextet} alt="" />
                    </button>
                </>
            )} */}
                <>
                    <button className="btnNext" onClick={nextChapter}>
                        <img src={btnNext} alt="" />
                    </button>
                    <button className="btnNextet" onClick={lastPage}>
                    <img src={btnNextet} alt="" />
                    </button>
                </>
        </div>
    );
};

export default Pagination;
