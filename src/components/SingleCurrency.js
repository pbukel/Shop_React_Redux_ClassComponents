import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 114px;
  height: 45px;
  font-family: "Raleway";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 160%;
  :hover {
    background: #eeeeee;
  }
`;

class SingleCurrency extends Component {
  render() {
    const handleCurrencySelect = () => {
      this.props.dispatch({
        type: "SET_SELECTED_CURRENCY",
        value: this.props.currency,
      });
    };
    return (
      <Container onClick={handleCurrencySelect}>
        {`${this.props.currency.symbol} ${this.props.currency.label}`}
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

export default connect(mapStateToProps, mapDispatchToProps)(SingleCurrency);
