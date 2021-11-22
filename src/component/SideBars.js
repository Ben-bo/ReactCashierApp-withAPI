import React, { Component } from "react";
import { Row, Col, ListGroup } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../utils/constant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faCoffee,
  faCheese,
} from "@fortawesome/free-solid-svg-icons";

const Icon = ({ nama }) => {
  if (nama === "Makanan")
    return <FontAwesomeIcon icon={faUtensils} className="" />;
  if (nama === "Minuman")
    return <FontAwesomeIcon icon={faCoffee} className="" />;
  if (nama === "Cemilan")
    return <FontAwesomeIcon icon={faCheese} className="" />;
};

class Sidebars extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
    };
  }
  componentDidMount() {
    axios
      .get(`${API_URL}categories`)
      .then((res) => {
        const dataCategories = res.data;
        this.setState({ categories: dataCategories });
      })
      .catch((e) => {
        console.log(e);
      });
  }
  render() {
    const { categories } = this.state;
    const { changeCategory, choosenCategory } = this.props;
    return (
      <Col md={2} mt="2">
        <h3>Side Bars</h3>
        <hr />
        <ListGroup as="ul">
          {categories &&
            categories.map((data) => (
              <ListGroup.Item
                as="li"
                onClick={() => changeCategory(data.nama)}
                className={
                  choosenCategory === data.nama && "bg-success text-white"
                }
                style={{ cursor: "pointer" }}
              >
                <Row>
                  <Col md={2}>
                    <Icon nama={data.nama} />
                  </Col>
                  <Col md={10}>{data.nama}</Col>
                </Row>
              </ListGroup.Item>
            ))}
        </ListGroup>
      </Col>
    );
  }
}

export default Sidebars;
