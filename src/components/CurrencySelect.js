import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { GET_CURRENCIES } from "../GraphQL/CurrencyQuerry";
import SingleCurrency from "./SingleCurrency";

//Style
const Container = styled.div``;
const Top = styled.div`
  display: flex;
  align-items: center;
`;
const Svg = styled.svg`
  transition: 0.3s;
  transform: ${(props) => (props.rotate === "true" ? `rotate(180deg)` : "")};
`;
const Bottom = styled.div`
  display: flex;
  justify-content: center;
`;

const CurrencyBox = styled.div`
  width: 114px;
  box-shadow: 0px 4px 10px rgba(168, 172, 176, 0.438);
  background: #ffffff;
  z-index: 2;
`;

class CurrencySelect extends Component {
  constructor() {
    super();
    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  async getCurrency() {
    fetch("http://localhost:4000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: GET_CURRENCIES,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        this.props.dispatch({
          type: "SET_ALL_CURRENCY",
          value: data.data.currencies,
        });
        this.props.dispatch({
          type: "SET_SELECTED_CURRENCY",
          value: data.data.currencies[0],
        });
      });
  }
  componentDidMount() {
    this.getCurrency();
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      this.props.dispatch({
        type: "SET_SHOW_CURRENCY",
        value: false,
      });
      document.removeEventListener("mousedown", this.handleClickOutside);
    }
  }

  render() {
    const showCurrencyBox = () => {
      this.props.dispatch({
        type: "SET_SHOW_CURRENCY",
      });
      document.addEventListener("mousedown", this.handleClickOutside);
    };
    return (
      <Container onClick={showCurrencyBox}>
        <Top>
          {this.props.state.selectedCurrency &&
            this.props.state.selectedCurrency.symbol}

          <Svg
            rotate={this.props.state.showCurrency.toString()}
            fill="#000000"
            height="20"
            viewBox="0 0 20 20"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z" />
            <path d="M0-.75h24v24H0z" fill="none" />
          </Svg>
        </Top>

        <Bottom ref={this.wrapperRef}>
          {this.props.state.allCurrency &&
            (this.props.state.showCurrency === true ? (
              <CurrencyBox>
                {this.props.state.allCurrency.map((item, i) => (
                  <SingleCurrency key={i} currency={item} />
                ))}
              </CurrencyBox>
            ) : null)}
        </Bottom>
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

export default connect(mapStateToProps, mapDispatchToProps)(CurrencySelect);
