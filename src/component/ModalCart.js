import {
  faMinus,
  faPlus,
  faSave,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import Formatnumber from "../utils/formatNumber";

const Modalcart = ({
  showModal,
  handleClose,
  cartDetail,
  jumlah,
  keterangan,
  summation,
  subtraction,
  changeHandler,
  handleSubmit,
}) => {
  if (cartDetail) {
    return (
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className=" w-100">
            {cartDetail.produk.nama}

            <p className="small text-success" style={{ fontSize: 15 }}>
              Rp. {Formatnumber(cartDetail.produk.harga)}
            </p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Row>
                <Col>
                  <Form.Label>TOTAL HARGA</Form.Label>
                  <p className="text-success">
                    <strong>Rp. {Formatnumber(cartDetail.total_harga)}</strong>
                  </p>
                </Col>
                <Col className="text-center">
                  <Form.Label style={{ display: "block" }}>JUMLAH</Form.Label>
                  <Button variant="primary" onClick={() => subtraction()}>
                    <FontAwesomeIcon icon={faMinus} size="sm" />
                  </Button>
                  <strong className="mx-3">{jumlah}</strong>
                  <Button variant="primary" onClick={() => summation()}>
                    <FontAwesomeIcon icon={faPlus} size="sm" />
                  </Button>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Keterangan Tambahan</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="keterangan"
                className="keterangan"
                value={keterangan}
                onChange={(event) => changeHandler(event)}
              />
            </Form.Group>
            <Button variant="success" size="md" type="submit">
              <FontAwesomeIcon icon={faSave} /> Save
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger">
            <FontAwesomeIcon icon={faTrash} /> DELETE
          </Button>
        </Modal.Footer>
      </Modal>
    );
  } else {
    return (
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Kosong</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
};

export default Modalcart;
