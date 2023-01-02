import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import SingleProduct from "../components/SingleProduct";

const Container = styled.div`
  padding-top: 160px;
  margin-left: 100px;
  padding-bottom: 100px;
  z-index: 0;
`;
const Title = styled.div`
  font-family: "Raleway";
  font-style: normal;
  font-weight: 400;
  font-size: 41px;
  line-height: 160%;
  color: #1d1f22;
`;
const ProductContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 100px;
`;

class MainPage extends Component {
  render() {
    return (
      <Container>
        <Title>
          {this.props.state.selectedCategory[0].toUpperCase() +
            this.props.state.selectedCategory.slice(1)}
        </Title>
        <ProductContainer>
          {this.props.prodState &&
            this.props.prodState.map((product, index) => (
              <SingleProduct key={index} product={product} />
            ))}
        </ProductContainer>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
