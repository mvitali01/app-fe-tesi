import React from "react";
import {render} from "@testing-library/react"; 
import Login from "../pages/Login";
import { MemoryRouter } from "react-router-dom";
test("Test login:dovrebbe essere presente all'interno un place holder di nome: user",()=>{
    const {getByPlaceholderText} = render(<MemoryRouter initialEntries={['/']}><Login/></MemoryRouter>)
    const ph =  getByPlaceholderText('user')
    expect(ph).toBeInTheDocument()
})