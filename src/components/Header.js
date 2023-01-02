import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import HeaderElement from "./HeaderElement";
import logo from "../SVG/a-logo.svg";
import cartlogo from "../SVG/Empty Cart.svg";
import CurrencySelect from "./CurrencySelect";
import SmallCart from "./SmallCart";

//style
const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 10px;
  z-index: 100;
  background-color: #ffffff;
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 100px;
`;
const Center = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 100px;
`;
const Currency = styled.div`
  width: 50px;
  height: 29px;
  font-family: "Raleway";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 160%;
  cursor: pointer;
`;
const CartContainer = styled.div`
  width: 20px;
  height: 20px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 17px;
`;
const Cart = styled.div`
  position: relative;
`;
const CartQty = styled.div`
  position: absolute;
  top: -10px;
  left: 15px;
  width: 18px;
  height: 18px;
  background: black;
  border-radius: 60px;
  color: #ffffff;
  font-family: "Raleway";
  font-weight: 700;
  font-size: 14px;
  text-align: center;
`;

class Header extends Component {
  constructor() {
    super();
    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      this.props.dispatch({
        type: "SET_SHOW_SMALL_CART",
        value: false,
      });
      document.removeEventListener("mousedown", this.handleClickOutside);
    }
  }
  render() {
    const closeOpenSmallCart = () => {
      this.props.dispatch({
        type: "SET_SHOW_SMALL_CART",
      });
      document.addEventListener("mousedown", this.handleClickOutside);
    };

    return (
      <Container>
        <Left>
          {this.props.state.categories.map((item, i) => (
            <HeaderElement
              key={i}
              header_category={item.name}
              setProds={this.props.setProds}
            />
          ))}
        </Left>
        <Center>
          <img src={logo} alt="" />
        </Center>
        <Right>
          <Currency>
            <CurrencySelect />
          </Currency>
          <CartContainer ref={this.wrapperRef}>
            <Cart>
              <img onClick={closeOpenSmallCart} src={cartlogo} alt="" />
              {this.props.state.qty > 0 ? (
                <CartQty>{this.props.state.qty}</CartQty>
              ) : null}
            </Cart>

            {this.props.state.showSmallCart && <SmallCart />}
          </CartContainer>
        </Right>
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
