import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import CartItem from "./CartItem";

const Container = styled.div`
  width: 325px;
  height: 677px;
  box-shadow: 0px 4px 10px rgba(168, 172, 176, 0.438);
  background: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 32px;
  transition: 100ms;
  padding: 16px;
  padding-bottom: 30px;
  padding-top: 32px;
  margin-top: 10px;
`;

const ProductContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  overflow: auto;
`;
const CartName = styled.div`
  font-family: "Raleway";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 160%;
  text-align: left;
  color: #1d1f22;
`;
const TotalCotainer = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: "Raleway";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
`;
const Botton = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 35px;
`;

const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;
const ViewButton = styled.button`
  width: 50%;
  height: 43px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  font-family: "Raleway";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 120%;
  cursor: pointer;
`;
const CheckoutButton = styled.button`
  width: 50%;
  height: 43px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #5ece7b;
  font-family: "Raleway";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 120%;
  color: #ffffff;
  cursor: pointer;
  border: none;
`;

const Total = styled.div``;
const Currency = styled.div``;

class SmallCart extends Component {
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
        <ProductContainer>
          <CartName>My bag, {this.props.state.basket.length} items</CartName>
          {this.props.state.basket.map((item, i) => (
            <CartItem
              key={i}
              product={item}
              productInBasketIndex={i}
              fromSmallCart={true}
            />
          ))}
        </ProductContainer>

        <Botton>
          <TotalCotainer>
            <Total>Total</Total>
            <Currency>
              {this.props.state.selectedCurrency.symbol}
              {total}
            </Currency>
          </TotalCotainer>
          <ButtonsContainer>
            <ViewButton>
              <Link
                onClick={() => {
                  this.props.dispatch({
                    type: "SET_SHOW_SMALL_CART",
                  });
                }}
                to={"/bag"}
                style={{ textDecoration: "none", color: "black" }}
              >
                VIEW BAG
              </Link>
            </ViewButton>

            <CheckoutButton>CHEKC OUT</CheckoutButton>
          </ButtonsContainer>
        </Botton>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    age: state.age,
    state,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onAgeUp: () => dispatch({ type: "AGE_UP" }),
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SmallCart);
