import React, { Component } from "react";
import styled from "styled-components";
import SingleDefaultAtribut from "./SingleDefaultAtribut";
//Style
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
const ParamsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

class DefaultProductAtributs extends Component {
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
        <ParamsContainer>
          {this.props.atribut.items.map((x, i) => (
            <SingleDefaultAtribut
              key={i}
              atr={x}
              atributIndex={this.props.index}
              atributValueIndex={i}
              fromSmallCart={this.props.fromSmallCart}
              productInBasketIndex={this.props.productInBasketIndex}
              fromBigCart={this.props.fromBigCart}
              fromCart={this.props.fromCart}
            />
          ))}
        </ParamsContainer>
      </Container>
    );
  }
}
export default DefaultProductAtributs;
