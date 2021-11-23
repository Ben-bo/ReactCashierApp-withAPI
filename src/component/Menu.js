import React from "react";
import { Col, Card, Button } from "react-bootstrap";
import formatNumber from "../utils/formatNumber";
const Menu = ({ menuk: menu, cartValue: dataCart }) => {
  return (
    <Col md={4} xs={6} className="mb-2 d-flex">
      <Card className="shadow-sm p-3 w-100" onClick={() => dataCart(menu)}>
        <Card.Img
          variant="top"
          src={`assets/images/${menu.category.nama}/${menu.gambar}`}
          alt={"gambar " + menu.nama}
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title>
            {menu.nama} ({menu.kode})
          </Card.Title>
          <Card.Text>Rp.{formatNumber(menu.harga)}</Card.Text>
          <Button className="mt-auto" variant="success">
            Order
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Menu;
