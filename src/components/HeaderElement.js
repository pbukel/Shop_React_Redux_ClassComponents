import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { GET_PRODUCTS } from "../GraphQL/ProductQuerrie";

//style
const HeaderNavElement = styled.div`
  height: 80px;
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Raleway";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 120%;
  text-align: center;
  text-transform: uppercase;
  cursor: pointer;
`;

class HeaderElement extends Component {
  render() {
    const categoryChange = () => {
      this.props.dispatch({
        type: "SET_SELECTED_CATEGORY",
        value: this.props.header_category,
      });

      fetch("http://localhost:4000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: GET_PRODUCTS,
          variables: {
            categorie: this.props.header_category,
          },
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          this.props.setProds(data.data.category.products);
        });
    };
    const selecteTextdStyle = {
      color: "#5ECE7B",
      borderBottom: "2px solid #5ECE7B",
    };

    return (
      <Link
        to={
          this.props.header_category === "all"
            ? `/`
            : `/${this.props.header_category}`
        }
        style={{ textDecoration: "none", color: "black" }}
      >
        <HeaderNavElement
          onClick={categoryChange}
          style={
            this.props.state.selectedCategory === this.props.header_category
              ? selecteTextdStyle
              : null
          }
        >
          {this.props.header_category}
        </HeaderNavElement>
      </Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(HeaderElement);
