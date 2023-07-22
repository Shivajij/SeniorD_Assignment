
import React from 'react'
import { Box } from "@mui/material"
import { Routes, Route } from 'react-router' 
import Main from '../Main'
import CatBreedsTable from '../CatBreedsTable'
import CatBreedsTree from '../CatBreedsTree'



function Assignment1() {
  return (
    <Box>
      <Routes> 
        <Route path='/' element={<Main/>}  />
        <Route path='/table' element={<CatBreedsTable/>} />
        <Route path='/tree' element={<CatBreedsTree/>}  />
      </Routes>
    </Box>
  )
}

export default Assignment1
