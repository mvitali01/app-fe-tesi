import React from "react";
import {render} from "@testing-library/react"; 
import FilterDepartment from "../pages/FilterDepartment"
test("Test start :dovrebbe essere presente all'interno del componente la parola :seleziona'",()=>{
    const {getByTestId} = render(<FilterDepartment/>)
    const text =  getByTestId('seleziona')
    expect(text).toBeInTheDocument()
})