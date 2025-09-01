import React from 'react'  
import { createContext, useState } from 'react'

export const PageContainer = createContext();

export function PaginationContextProvider({children}) {
    const [pageNum, setPageNum] = useState(1);
    const [pageSize, setPageSize] = useState(5);
  return (
    <PageContainer.Provider value={{
      pageNum,
      pageSize,
      setPageNum,
      setPageSize
    }}>
      {children}
    </PageContainer.Provider>
  )
}   