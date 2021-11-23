import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Component } from "react";
import { Navbarcomponent } from "./component";
import { Home, Success } from "./pages";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Navbarcomponent />
        <main>
          <Routes>
            {/* mengganti Switch dengan Routes serta metode menampilkan halaman Home dan Suskes*/}
            <Route path="/" element={<Home />} />
            <Route path="/success" element={<Success />} />
          </Routes>
        </main>
      </BrowserRouter>
    );
  }
}

export default App;
