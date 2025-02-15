import React from "react";
import { render } from "@testing-library/react";
test("Test del compomente del Menu Principale, dovrebbe essere presente la stringa:\"Menu principale\"",()=>{
    const {getByText} = render(
        <font face="Arial">
            <h1 align="center"><br/>Menu principale</h1>
            <br/>
            <hr width="150%"/>
            <table align="left" width="25%">
                <tbody>
                    <tr>
                        <td><button  id="refresh_button" ></button></td>
                    </tr>
                </tbody>
            </table>
            <table align="left" width="30%">
                <tbody>
                <tr>
                    <td><button> <font align="center"> Elimina docente/i </font> </button></td>
                    <td><button > Torna al caricamento dei file</button></td>
                </tr>
                </tbody>
            </table>
        </font>
    )
    const test = getByText('Menu principale')
    expect(test).toBeInTheDocument()
})