import React, { Component } from "react";
import { connect } from "react-redux";
import ProductColors from "../components/ProductColors";
import ProductSizes from "../components/ProductSizes";
import DefaultProductAtributs from "../components/DefaultProductAtributs";
import { getPrice } from "../functions/functions";
import { Interweave } from "interweave";
import { useParams } from "react-router-dom";
import { GET_SINGLE_PROD_INFO } from "../GraphQL/ProductInfoQuerrie";
import { addKey } from "../functions/functions";
import styled from "styled-components";
import { sameOrDifferentCheck } from "../functions/sameorDifferentCheck";

const Container = styled.div`
  padding-top: 160px;
  margin-left: 100px;
  display: flex;
  width: 1120px;
  height: 600px;
  gap: 100;
`;
const Images = styled.div`
  display: flex;
  height: 100%;
  gap: 20px;
`;
const SmallImgContaner = styled.div`
  height: 100%;
  overflow: auto;
  width: 100px;
`;
const SmallImg = styled.div`
  width: 80px;
  height: 80px;
  cursor: pointer;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  overflow: hidden;
  margin-bottom: 30px;
`;
const MainImg = styled.div`
  width: 610px;
  height: 511px;
  background-position: center;
  margin-right: 92px;
  background-repeat: no-repeat;
  background-size: contain;
`;

const InfoContainer = styled.div`
  width: 310px;
  height: 595px;
`;

const ProductBrand = styled.div`
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

const ProductName = styled.div`
  font-family: "Raleway";
  font-style: normal;
  font-weight: 400;
  font-size: 30px;
  line-height: 27px;
  display: flex;
  align-items: center;
  color: #1d1f22;
  margin-bottom: 43px;
`;

const AtributesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Alert = styled.div`
  font-family: "Raleway";
  text-transform: uppercase;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 159.96%;
  color: rgb(249, 9, 9);
`;
const Price = styled.div`
  margin-top: 36px;
  font-family: "Roboto Condensed";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 18px;
  color: #1d1f22;
`;
const Amount = styled.div`
  margin-top: 20px;
  font-family: "Raleway";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 18px;
  color: #1d1f22;
`;
const AddToCart = styled.div`
  cursor: pointer;
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 52px;
  background: #5ece7b;

  p {
    font-family: "Raleway";
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 120%;
    display: flex;
    align-items: center;
    text-align: center;
    text-transform: uppercase;
    color: #ffffff;
  }
`;

const Description = styled.div`
  width: 100%;
  height: 150px;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 159.96%;
  color: #1d1f22;
  overflow: auto;
  text-align: start;
`;

// function to use useParams hook and get name of product
function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class ProductPage extends Component {
  constructor() {
    super();
    this.state = {
      mainImage: null,
      atributSelected: false,
    };
  }
  setMainImage = (value) => {
    this.setState({
      mainImage: value,
    });
  };
  setAtributSelected = (value) => {
    this.setState({
      atributSelected: value,
    });
  };
  setProductCopy = (value) => {
    console.log("setas", value);
    this.setState({
      productCopy: value,
    });
  };

  async getProductData(id) {
    fetch("http://localhost:4000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: GET_SINGLE_PROD_INFO,
        variables: { id },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        this.props.dispatch({
          type: "SET_PRODUCT_INFO",
          value: addKey(data.data),
        });
        this.props.dispatch({
          type: "SET_PRODUCT_COPY",
          value: addKey(data.data),
        });
        this.setMainImage(data.data.product.gallery[0]);
      });
  }

  componentDidMount() {
    const { name } = this.props.params;
    this.getProductData(name);
  }

  render() {
    const setAsMain = (url) => {
      this.setMainImage(url);
    };

    const addToBasket = async () => {
      // Checking, did all atributes selected? ===>
      const reply = this.props.state.productInfo.attributes.map((x) =>
        x.items.find((x) => x.isSelected === true)
      );
      const notSelectedAtr = reply.includes(undefined);
      if (notSelectedAtr) {
        this.setAtributSelected(true);
        return;
      } else {
        this.setAtributSelected(false);
        let prodCopy = { ...this.props.state.productInfo };
        // checking did added item have same atributs or it is a different one
        await sameOrDifferentCheck(prodCopy);

        this.props.dispatch({
          type: "RESET_PROD_INFO",
        });
      }
      let qtyCalculations = this.props.state.basket.map((x) => x.qty);
      let totalqty = qtyCalculations.reduce(function (a, b) {
        return a + b;
      }, 0);

      this.props.dispatch({
        type: "SET_QTY",
        value: totalqty,
      });
    };

    return (
      <Container>
        <Images>
          <SmallImgContaner>
            {this.props.state.productInfo &&
              this.props.state.productInfo.gallery.map((url, index) => (
                <SmallImg
                  onClick={() => setAsMain(url)}
                  style={{ backgroundImage: `url(${url})` }}
                  key={index}
                ></SmallImg>
              ))}
          </SmallImgContaner>
          <MainImg
            style={{ backgroundImage: `url(${this.state.mainImage})` }}
          ></MainImg>
        </Images>

        {this.props.state.productInfo && (
          <InfoContainer>
            <ProductBrand className="brand">
              {this.props.state.productInfo.brand}
            </ProductBrand>
            <ProductName className="name">
              {this.props.state.productInfo.name}
            </ProductName>
            <AtributesContainer>
              {this.props.state.productInfo.attributes.map((x, i) => {
                if (x.id === "Color") {
                  return <ProductColors key={i} atribut={x} index={i} />;
                }
                if (x.id === "Size") {
                  return <ProductSizes key={i} atribut={x} index={i} />;
                } else {
                  return (
                    <DefaultProductAtributs key={i} atribut={x} index={i} />
                  );
                }
              })}
              {this.state.atributSelected && (
                <Alert>Please select all atributes beffore continue!</Alert>
              )}
            </AtributesContainer>

            <Price>PRICE:</Price>

            {this.props.state.selectedCurrency.hasOwnProperty("label") ? (
              <Amount>
                {getPrice(
                  this.props.state.productInfo,
                  this.props.state.selectedCurrency
                )}
              </Amount>
            ) : null}

            <AddToCart onClick={addToBasket}>
              <p>ADD TO CART</p>
            </AddToCart>

            <Description>
              <Interweave content={this.props.state.productInfo.description} />
            </Description>
          </InfoContainer>
        )}
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
)(withParams(ProductPage));
