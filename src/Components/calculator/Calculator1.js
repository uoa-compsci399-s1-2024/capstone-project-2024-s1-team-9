import React, { useState } from "react";
import { Container, Row, Col, DropdownButton, Dropdown } from "react-bootstrap";
import FoodForm from "./FoodForm";
import NonDairyForm from "./NonDairyForm";
import "./Calculator1Styles.css";
const Calculator1 = () => {
  const [selectedCategory, setSelectedCategory] = useState("food");

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <Container>
      <Row>
        <Col size={12}>
        
          <DropdownButton
          className="dropdown-button"
            
            title="Select Category"
            variant="primary"
            onSelect={(eventKey) => handleCategorySelect(eventKey)}
          >
            <Dropdown.Item eventKey="food">Foods</Dropdown.Item>
            <Dropdown.Item eventKey="non-dairy">Non-Dairy Beverages</Dropdown.Item>
          </DropdownButton>
        </Col>
      </Row>
      <Row>
        <Col size={12}>
          
          {selectedCategory === "food" && <FoodForm />}
          {selectedCategory === "non-dairy" && <NonDairyForm />}
        </Col>
      </Row>
    </Container>
  );
};

export default Calculator1;
