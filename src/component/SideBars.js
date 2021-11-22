import React, { Component } from "react";
import { Col, ListGroup } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../utils/constant";

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
    return (
      <Col md={2} mt="2">
        <h3>Side Bars</h3>
        <hr />
        <ListGroup as="ul">
          {categories &&
            categories.map((data) => (
              <ListGroup.Item as="li">{data.nama}</ListGroup.Item>
            ))}
        </ListGroup>
      </Col>
    );
  }
}

export default Sidebars;
