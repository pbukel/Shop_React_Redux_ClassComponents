import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import {
  handleAtributChangeInBasket,
  handleSelection,
} from "../functions/atributSelectionAndChange";
const Container = styled.div`
  cursor: pointer;
  width: ${(props) => (props.size === "size" ? "63px" : "46px")};
  height: ${(props) => (props.size === "size" ? "45px" : "24px")};
  border: 1.3px solid black;
  font-family: ${(props) =>
    props.size === "size" ? "Roboto Condensed" : "Source Sans Pro"};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${(props) => (props.size === "smallSize" ? "2px" : "")};
  font-style: normal;
  font-weight: 400;
  font-size: ${(props) => (props.size === "smallSize" ? "12px" : "14px")};
  line-height: 100%;
  text-align: center;
`;

class SingleSizeAtribut extends Component {
  render() {
    const Selection = () => {
      handleSelection(this.props.atributIndex, this.props.atributValueIndex);
    };
    const atributChange = () => {
      handleAtributChangeInBasket(
        this.props.productInBasketIndex,
        this.props.atributIndex,
        this.props.atributValueIndex
      );
    };

    const selectedStyle = {
      backgroundColor: "#1D1F22",
      color: "#FFFFFF",
    };
    return (
      <Container
        size={
          this.props.fromCart
            ? this.props.fromBigCart
              ? "size"
              : "smallSize"
            : "size"
        }
        onClick={
          this.props.fromSmallCart
            ? null
            : this.props.fromCart
            ? atributChange
            : Selection
        }
        style={this.props.atr.isSelected ? selectedStyle : null}
      >
        <span>{this.props.atr.displayValue}</span>
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
export default connect(mapStateToProps, mapDispatchToProps)(SingleSizeAtribut);
