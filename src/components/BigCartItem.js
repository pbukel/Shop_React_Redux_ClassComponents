import React, { Component } from "react";
import styled from "styled-components";
import ProductColors from "./ProductColors";
import ProductSizes from "./ProductSizes";
import DefaultProductAtributs from "./DefaultProductAtributs";
import toLeft from "../SVG/VectorLeft.svg";
import toRight from "../SVG/VectorRight.svg";
import { connect } from "react-redux";
import { add, remove } from "../functions/addRemoveQty";
//STYLE
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 336px;
  border-top: 1px solid #e5e5e5;
`;
const InfoCotnainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 288px;
  width: 300px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Brand = styled.div`
  font-family: "Raleway";
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 27px;
  display: flex;
  align-items: center;
  color: #1d1f22;
  margin-bottom: 16px;
`;
const Name = styled.div`
  font-family: "Raleway";
  font-style: normal;
  font-weight: 400;
  font-size: 30px;
  line-height: 27px;
  display: flex;
  align-items: center;
  color: #1d1f22;
  margin-bottom: 30px;
`;

const Amount = styled.div`
  font-family: "Raleway";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 18px;
  color: #1d1f22;
  margin-bottom: 30px;
`;

const Atributes = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ImageAndQty = styled.div`
  display: flex;
  justify-content: space-between;
  height: 288px;
  width: 269px;
`;

const QtyControl = styled.div`
  height: 100%;
  width: 45px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Image = styled.div`
  height: 288px;
  width: 200px;
`;

const Button = styled.button`
  width: 45px;
  height: 45px;
  background: #ffffff;
  cursor: pointer;
`;

const Switcher = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  width: 56px;
  height: 24px;
  left: 130px;
  top: 245px;
`;
const ToLeft = styled.div`
  width: 24px;
  height: 24px;
  background: rgba(0, 0, 0, 0.73);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const ToRight = styled.div`
  width: 24px;
  height: 24px;
  background: rgba(0, 0, 0, 0.73);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

class BigCartItem extends Component {
  constructor() {
    super();
    this.state = {
      currentIndex: 0,
    };
  }
  setCurrentIndex = (value) => {
    this.setState({
      currentIndex: value,
    });
  };
  render() {
    const getPrice = () => {
      const price = this.props.product.prices.find(
        (item) =>
          item.currency.label === this.props.state.selectedCurrency.label
      );
      return `${this.props.state.selectedCurrency.symbol}${price.amount}`;
    };
    const slideStyles = {
      backgroundSize: "100%",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    };
    const slideStylesWidthBackground = {
      ...slideStyles,
      backgroundImage: `url(${
        this.props.product.gallery[this.state.currentIndex]
      })`,
    };
    // Go to previous picture
    const goToPrevious = () => {
      const isFirstSlide = this.state.currentIndex === 0;
      const newIndex = isFirstSlide
        ? this.props.product.gallery.length - 1
        : this.state.currentIndex - 1;
      this.setCurrentIndex(newIndex);
    };
    // Go to next picture
    const goToNext = () => {
      const isLastSlide =
        this.state.currentIndex === this.props.product.gallery.length - 1;
      const newIndex = isLastSlide ? 0 : this.state.currentIndex + 1;
      this.setCurrentIndex(newIndex);
    };
    // // Add  remove prod qty
    const plus = () => {
      add(this.props.productInBasketIndex);
    };
    const minus = () => {
      remove(this.props.productInBasketIndex);
    };

    return (
      <Container>
        <InfoCotnainer>
          <Brand>{this.props.product.brand}</Brand>
          <Name>{this.props.product.name}</Name>

          {this.props.state.selectedCurrency ? (
            <Amount>{getPrice()}</Amount>
          ) : null}
          <Atributes>
            {this.props.product.attributes.map((item, i) => {
              if (item.id === "Color") {
                return (
                  <ProductColors
                    key={i}
                    atribut={item}
                    index={i}
                    fromCart={true}
                    productInBasketIndex={this.props.productInBasketIndex}
                    fromBigCart={true}
                  />
                );
              }
              if (item.id === "Size") {
                return (
                  <ProductSizes
                    key={i}
                    atribut={item}
                    index={i}
                    fromCart={true}
                    productInBasketIndex={this.props.productInBasketIndex}
                    fromBigCart={true}
                  />
                );
              } else {
                return (
                  <DefaultProductAtributs
                    key={i}
                    atribut={item}
                    index={i}
                    fromCart={true}
                    productInBasketIndex={this.props.productInBasketIndex}
                    fromBigCart={true}
                  />
                );
              }
            })}
          </Atributes>
        </InfoCotnainer>
        <ImageAndQty>
          <QtyControl>
            <Button onClick={plus}>+</Button>
            <div>{this.props.product.qty}</div>
            <Button onClick={minus}>-</Button>
          </QtyControl>
          <Image style={slideStylesWidthBackground}>
            {this.props.product.gallery.length > 1 ? (
              <Switcher>
                <ToLeft onClick={goToPrevious}>
                  <img src={toLeft} alt="" />
                </ToLeft>
                <ToRight onClick={goToNext}>
                  <img src={toRight} alt="" />
                </ToRight>
              </Switcher>
            ) : null}
          </Image>
        </ImageAndQty>
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
export default connect(mapStateToProps, mapDispatchToProps)(BigCartItem);
