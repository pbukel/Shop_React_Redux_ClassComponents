import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import {
  handleAtributChangeInBasket,
  handleSelection,
} from "../functions/atributSelectionAndChange";

const Container = styled.div`
  cursor: pointer;
  width: ${(params) => (params.size === "smallColor" ? "16px" : "32px")};
  height: ${(params) => (params.size === "smallColor" ? "16px" : "32px")};
  border: 1px solid black;
`;

class SingleColorAtribut extends Component {
  render() {
    //functions to handle atribut selections nad change
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
      backgroundColor: this.props.atr.displayValue,
      border: "2px solid #5ECE7B",
    };
    const defaultStyle = { backgroundColor: this.props.atr.displayValue };
    return (
      <Container
        onClick={
          this.props.fromSmallCart
            ? null
            : this.props.fromCart
            ? atributChange
            : Selection
        }
        size={
          this.props.fromCart
            ? this.props.fromBigCart
              ? "color"
              : "smallColor"
            : "color"
        }
        style={this.props.atr.isSelected ? selectedStyle : defaultStyle}
      ></Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(SingleColorAtribut);
