import React, { FC } from 'react'
import { Link } from 'gatsby'
import './pagination.scss'

type pageInfoType = {
  currentPage: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  pageCount: number
  categorySlug?: string
  tagSlug?: string
}

const Pagination: FC<pageInfoType> = ({
  currentPage,
  hasNextPage,
  hasPreviousPage,
  pageCount,
  categorySlug,
  tagSlug,
}) => {
  let previousPage
  if (currentPage - 1 === 1) {
    previousPage = ''
  } else {
    previousPage = currentPage - 1
  }

  const slug = categorySlug ?? tagSlug ?? ''

  return (
    <div className="pagination-bar">
      {hasPreviousPage ? (
        <Link className="buttobi-arrow" to={`/${slug}`}>
          ≪
        </Link>
      ) : (
        <div className="empty"></div>
      )}
      {hasPreviousPage ? (
        <Link className="radius" to={`/${slug}${previousPage}`}>
          {currentPage - 1}
        </Link>
      ) : (
        <div className="empty"></div>
      )}
      <p>{`${currentPage} / ${pageCount}`}</p>
      {hasNextPage ? (
        <Link className="radius" to={`/${slug}${currentPage + 1}`}>
          {currentPage + 1}
        </Link>
      ) : (
        <div className="empty"></div>
      )}
      {hasNextPage ? (
        <Link className="buttobi-arrow" to={`/${slug}${pageCount}`}>
          ≫
        </Link>
      ) : (
        <div className="empty"></div>
      )}
    </div>
  )
}

export default Pagination
