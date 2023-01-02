import React, { Component } from "react";
import styled from "styled-components";
import { getPrice } from "../functions/functions";
import ProductColors from "./ProductColors";
import DefaultProductAtributs from "./DefaultProductAtributs";
import ProductSizes from "./ProductSizes";
import { connect } from "react-redux";
import { add, remove } from "../functions/addRemoveQty";
// Style
const Container = styled.div`
  width: 100%;
  display: flex;
  gap: 2px;
  justify-content: space-between;
`;

const Left = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
`;
const DescContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const Title = styled.div`
  font-family: "Raleway";
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 160%;
  color: #1d1f22;
`;
const Price = styled.div`
  font-family: "Raleway";
  font-style: normal;
  font-weight: 900;
  font-size: 16px;
  line-height: 160%;
  color: #1d1f22;
`;
const AtributesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Center = styled.div`
  flex: 0.5;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
const Plus = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  border: 1px solid black;
  cursor: pointer;
  background: #ffffff;
`;
const Minus = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  border: 1px solid black;
  cursor: pointer;
  background: #ffffff;
`;
const Qty = styled.div`
  font-family: "Raleway";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 160%;
`;

const Right = styled.div`
  flex: 2;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`;

class CartItem extends Component {
  render() {
    // // Add  remove prod qty
    const plus = () => {
      add(this.props.productInBasketIndex);
    };
    const minus = () => {
      remove(this.props.productInBasketIndex);
    };

    return (
      <Container>
        <Left>
          <DescContainer>
            <Title>{`${this.props.product.brand} ${this.props.product.name}`}</Title>
            {this.props.state.selectedCurrency ? (
              <Price>
                {getPrice(
                  this.props.product,
                  this.props.state.selectedCurrency
                )}
              </Price>
            ) : null}
          </DescContainer>

          <AtributesContainer>
            {this.props.product.attributes.map((x, i) => {
              if (x.id === "Color") {
                return (
                  <ProductColors
                    key={i}
                    atribut={x}
                    index={i}
                    fromCart={true}
                    productInBasketIndex={this.props.productInBasketIndex}
                    fromSmallCart={this.props.fromSmallCart}
                  />
                );
              }
              if (x.id === "Size") {
                return (
                  <ProductSizes
                    key={i}
                    atribut={x}
                    index={i}
                    fromCart={true}
                    productInBasketIndex={this.props.productInBasketIndex}
                    fromSmallCart={this.props.fromSmallCart}
                  />
                );
              } else {
                return (
                  <DefaultProductAtributs
                    key={i}
                    atribut={x}
                    index={i}
                    fromCart={true}
                    productInBasketIndex={this.props.productInBasketIndex}
                    fromSmallCart={this.props.fromSmallCart}
                  />
                );
              }
            })}
          </AtributesContainer>
        </Left>
        <Center>
          <Plus onClick={plus}>+</Plus>
          <Qty className="qty">{this.props.product.qty}</Qty>
          <Minus onClick={minus}>-</Minus>
        </Center>
        <Right
          style={{ backgroundImage: `url(${this.props.product.gallery[0]})` }}
        ></Right>
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
export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
