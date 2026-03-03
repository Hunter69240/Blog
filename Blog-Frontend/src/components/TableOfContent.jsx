import React from 'react'

const TableOfContent = ({isDesktop}) => {
  return (
    <div>
        TableOfContent
        {isDesktop ? "Desktop" : "Mobile"}
    </div>
  )
}

export default TableOfContent