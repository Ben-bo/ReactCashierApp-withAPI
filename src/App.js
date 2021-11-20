import { Row, Col, Container } from "react-bootstrap";
import "./App.css";
import { Navbarcomponent, Sidebars, Result } from "./component";

function App() {
  return (
    <div className="App">
      <Navbarcomponent />
      <Container fluid>
        <Row>
          <Sidebars />
          <Col>
            <h1>Daftar produk</h1>
            <hr />
          </Col>
          <Result />
        </Row>
      </Container>
    </div>
  );
}

export default App;
