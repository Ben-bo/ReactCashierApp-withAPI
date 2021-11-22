import { Row, Col, Container } from "react-bootstrap";
// import "./App.css";
import { Navbarcomponent, Sidebars, Result, Menu } from "./component";
import { API_URL } from "./utils/constant";
import axios from "axios";
import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
    };
  }
  componentDidMount() {
    axios
      .get(`${API_URL}products`)
      .then((res) => {
        const products = res.data;
        this.setState({ menus: products });
      })
      .catch((e) => {
        console.log(e);
      });
  }
  render() {
    const { menus } = this.state;
    return (
      <div className="App">
        <Navbarcomponent />
        <Container fluid>
          <Row>
            <Sidebars />
            <Col>
              <h3>Daftar produk</h3>
              <hr />
              <Row>
                {menus &&
                  menus.map((menu) => <Menu key={menu.id} menu={menu} />)}
              </Row>
            </Col>
            <Result />
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
