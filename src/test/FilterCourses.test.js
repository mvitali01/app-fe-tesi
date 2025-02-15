import React from "react";
import {render} from "@testing-library/react"; 
import FilterCourses from "../pages/FilterCourses"
test("Test FilterCourses : dovrebbe essere presente il segeunte testo:\"Filtra per Dipartimento:\"",()=>{
    const {getByText} = render(<FilterCourses/>)
    const text =  getByText('Filtra per Dipartimento:')
    expect(text).toBeInTheDocument()
})