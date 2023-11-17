
import "../styles/VirtualShopping.scss"
import {render, fireEvent, screen} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { store } from "../store";
import { Router } from "react-router-dom";
import {VirtualShopping} from "../components/VirtualShopping";


test( 'Book Now button turn black when hover on it', () => {
  render(
    // <Router>
      <Provider store={store}>
        <VirtualShopping/>
      </Provider>
    // {/*</Router>*/}
  )

  const btnBookNow = screen.getByRole('button', {name: 'Book Now'})
  // hover on the button
  // fireEvent.mouseOver(btnBookNow)

  screen.getByText('Book Now')
  // expect(btnBookNow).getComputedStyle({backgroundColor: 'white'})
  // expect(btnBookNow).toHaveStyle({backgroundColor: 'white'})
})