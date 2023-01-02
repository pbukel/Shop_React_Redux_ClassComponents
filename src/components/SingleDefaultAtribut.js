import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import {
  handleAtributChangeInBasket,
  handleSelection,
} from "../functions/atributSelectionAndChange";

const Container = styled.div`
  cursor: pointer;
  width: ${(params) => (params.size === "default_atribut" ? "63px" : "24px")};
  height: ${(params) => (params.size === "default_atribut" ? "45px" : "24px")};
  border: 1.3px solid black;
  font-family: "Roboto Condensed";
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${(params) => (params.size === "default_atribut" ? "px" : "4px")};
  font-size: ${(params) => (params.size === "default_atribut" ? "" : "12px")};
`;

class SingleDefaultAtribut extends Component {
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
              ? "default_atribut"
              : "smallDefaultAtribut"
            : "default_atribut"
        }
        style={this.props.atr.isSelected ? selectedStyle : null}
      >
        {this.props.atr.displayValue}
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleDefaultAtribut);
