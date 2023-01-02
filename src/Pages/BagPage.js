import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import BigCartItem from "../components/BigCartItem";

const Container = styled.div`
  padding-top: 160px;
  margin-left: 100px;
  max-width: 1250px;
  display: flex;
  flex-direction: column;
  padding-bottom: 100px;
`;

const Name = styled.div`
  width: 84px;
  height: 40px;
  font-family: "Raleway";
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
  text-transform: uppercase;
  color: #1d1f22;
  margin-bottom: 55px;
`;
const ProductContainer = styled.div``;

const Calculations = styled.div`
  border-top: 1px solid #e5e5e5;
  width: 100%;
  height: 159px;
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const OrderCalculations = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

const Tax = styled.div`
  height: 28px;
  font-family: "Raleway";
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 28px;
  color: #1d1f22;
  span {
    font-weight: 700;
  }
`;
const OrderButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px 32px;
  width: 279px;
  height: 43px;
  background: #5ece7b;
  border: none;
  color: #ffffff;
  cursor: pointer;
`;

class BagPage extends Component {
  render() {
    const total = this.props.state.basket
      .map(
        (item) =>
          item.qty *
          item.prices.find(
            (priceItem) =>
              priceItem.currency.label ===
              this.props.state.selectedCurrency.label
          ).amount
      )
      .reduce(function (a, b) {
        return a + b;
      }, 0)
      .toFixed(2);
    return (
      <Container>
        <Name>CART</Name>
        <ProductContainer>
          {this.props.state.basket.map((x, i) => (
            <BigCartItem key={i} product={x} productInBasketIndex={i} />
          ))}
        </ProductContainer>

        <Calculations>
          <OrderCalculations>
            <Tax>
              Tax 21%:{" "}
              <span>
                {this.props.state.selectedCurrency.symbol}
                {(total - total / 1.21).toFixed(2)}
              </span>
            </Tax>
            <Tax>
              Quantity: <span>{this.props.state.qty}</span>
            </Tax>
            <Tax>
              Total:
              <span>
                {this.props.state.selectedCurrency.symbol}
                {total}
              </span>
            </Tax>
          </OrderCalculations>
          <OrderButton>ORDER</OrderButton>
        </Calculations>
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
export default connect(mapStateToProps, mapDispatchToProps)(BagPage);
