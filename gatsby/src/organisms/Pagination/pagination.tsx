import React, { FC } from 'react';
import { Link } from 'gatsby';
import "./pagination.scss";


type pageInfoType = {
  currentPage: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  pageCount: number
}

const Pagination: FC<pageInfoType> = ({currentPage, hasNextPage, hasPreviousPage, pageCount}) => {
  let previousPage
  let nextPage
  if (currentPage - 1 === 1) {
    previousPage = ""
  }
  else {
    previousPage = currentPage - 1
  }

  return (
    <div className="pagination-bar">
      {hasPreviousPage ? 
        <Link className="buttobi-arrow" to={`/`}>≪</Link>
        :
        <div className="empty"></div>
      }
      {hasPreviousPage ? 
        <Link className="radius" to={`/${previousPage}`}>{currentPage-1}</Link>
        :
        <div className="empty"></div>
      }
      <p>{`${currentPage} / ${pageCount}`}</p>
      {hasNextPage ?
        <Link className="radius" to={`/${currentPage+1}`}>{currentPage+1}</Link>
        :
        <div className="empty"></div>
      }
      {hasNextPage ?
        <Link className="buttobi-arrow" to={`/${pageCount}`}>≫</Link>
        :
        <div className="empty"></div>
      }
    </div>
  )
}

export default Pagination