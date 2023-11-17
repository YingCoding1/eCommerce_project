import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import {CheckoutSuccess} from "../components/CheckoutSuccess";
import {store} from "../store";
import {Provider} from "react-redux";
import {BrowserRouter, Link, MemoryRouter as Router} from 'react-router-dom'
import '@testing-library/jest-dom';


describe('test Checkout Success Page',() => {
    it('test the return home button',() => {
        render(
            <Router>
                <Provider store={store}>
                    <CheckoutSuccess/>
                </Provider>
            </Router>
        )
        //select the return home button and the button name
      const btnReturnHome = screen.getByRole('button',{name:'Return Home'})
        //click button
      fireEvent.click(btnReturnHome)
    })
    test('test button go to orderHistory',() => {
        render(
            <Router>
                <Provider store={store}>
                    <CheckoutSuccess/>
                </Provider>
            </Router>
        )
        //find the button
        const btnOrderHistory = screen.getByRole('button',{name:'Go To OrderHistory'})
        //check the button
        fireEvent.click(btnOrderHistory)
    })
test('test the logo Image',() => {
    render(
        <Router>
            <Provider store={store}>
                <CheckoutSuccess/>
                </Provider>
         </Router>

    )
    //find the logo
   const logoImage =  screen.getByTestId('TestImage')
  //check the logo
   expect(logoImage).toBeTruthy()

})

})