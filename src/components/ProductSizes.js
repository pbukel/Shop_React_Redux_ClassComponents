import React, { Component } from "react";
import styled from "styled-components";
import SingleSizeAtribut from "./SingleSizeAtribut";
import { connect } from "react-redux";

const Container = styled.div``;
const Name = styled.div`
  font-family: ${(props) =>
    props.fromWhere === "atributName" ? "Roboto Condensed" : "Raleway"};
  font-style: normal;
  font-weight: ${(props) =>
    props.fromWhere === "atributName" ? "800" : "400"};
  font-size: ${(props) =>
    props.fromWhere === "atributName" ? "18px" : "14px"};

  line-height: ${(props) =>
    props.fromWhere === "atributName" ? "18px" : "16px"};
  display: flex;
  align-items: center;
  text-align: ${(props) =>
    props.fromWhere === "atributName" ? "center" : "start"};
  color: #1d1f22;
  margin-bottom: 8px; //margin:0

  height: ${(props) => (props.fromWhere === "atributName" ? "" : "35px")};
`;
const SizeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

class ProductSizes extends Component {
  render() {
    return (
      <Container>
        <Name
          fromWhere={
            this.props.fromCart
              ? this.props.fromBigCart
                ? "atributName"
                : "smallAtributName"
              : "atributName"
          }
        >
          {this.props.atribut.id.toUpperCase()}:
        </Name>
        <SizeContainer>
          {this.props.atribut.items.map((x, i) => (
            <SingleSizeAtribut
              key={i}
              atr={x}
              atributIndex={this.props.index}
              atributValueIndex={i}
              fromCart={this.props.fromCart}
              productInBasketIndex={this.props.productInBasketIndex}
              fromBigCart={this.props.fromBigCart}
              fromSmallCart={this.props.fromSmallCart}
            />
          ))}
        </SizeContainer>
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
export default connect(mapStateToProps, mapDispatchToProps)(ProductSizes);
