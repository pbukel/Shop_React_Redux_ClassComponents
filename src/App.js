import React, { Component } from "react";
import { GET_PRODUCTS } from "./GraphQL/ProductQuerrie";
import { GET_CATEGORIES } from "./GraphQL/CategoriesQuerrie";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./Pages/MainPage";
import BagPage from "./Pages/BagPage";
import ProductPage from "./Pages/ProductPage";
import styled from "styled-components";
import { connect } from "react-redux";

import Header from "./components/Header";

const Container = styled.div`
  max-width: 1440px;
  margin: auto;
  height: 100vh;
`;
const InActive = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  height: 200%;
  background: rgba(57, 55, 72, 0.22);
  z-index: 10;
`;

class App extends Component {
  // State for Products
  constructor() {
    super();
    this.state = {
      products: null,
    };
  }

  setNewState = (value) => {
    this.setState({ ...this.state, products: value });
  };

  setCustomstate = (value) => {
    let state = { ...this.state };
    state.products = [];
    this.setState(state);

    setTimeout(() => {
      this.setNewState(value);
    }, 0);
  };
  async getCategories() {
    fetch("http://localhost:4000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: GET_CATEGORIES,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        this.props.dispatch({
          type: "SET_SELECTED_CATEGORY",
          value: data.data.categories[0].name,
        });
        this.props.dispatch({
          type: "SET_CATEGORIES",
          value: data.data.categories,
        });

        fetch("http://localhost:4000/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: GET_PRODUCTS,
            variables: {
              categorie: this.props.state.selectedCategory,
            },
          }),
        })
          .then((res) => res.json())
          .then((data) => this.setNewState(data.data.category.products));
      });
  }
  componentDidMount() {
    this.getCategories();
  }

  render() {
    return (
      <Container>
        <BrowserRouter>
          {this.props.state.categories && (
            <Header setProds={this.setCustomstate} />
          )}
          {this.props.state.showSmallCart && <InActive />}
          <Routes>
            <Route
              path="/"
              element={<MainPage prodState={this.state.products} />}
            />
            <Route
              path="/clothes"
              element={<MainPage prodState={this.state.products} />}
            />
            <Route
              path="/tech"
              element={<MainPage prodState={this.state.products} />}
            />
            <Route path="/productPage/:name" element={<ProductPage />} />
            <Route path="/all/productPage/:name" element={<ProductPage />} />
            <Route path="/tech/productPage/:name" element={<ProductPage />} />
            <Route
              path="/clothes/productPage/:name"
              element={<ProductPage />}
            />
            <Route path="/bag" element={<BagPage />} />
          </Routes>
        </BrowserRouter>
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
