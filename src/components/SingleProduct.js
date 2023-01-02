import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { GET_SINGLE_PROD_INFO } from "../GraphQL/ProductInfoQuerrie";
import { Link } from "react-router-dom";
import cirkleIcon from "../SVG/CircleIcon.svg";
import { addKey, getPrice } from "../functions/functions";
import { sameOrDifferentCheck } from "../functions/sameorDifferentCheck";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 386px;
  height: 444px;
  background: #ffffff;
  transition: all 0.4s ease;
  position: relative;
  :hover {
    // transform: scale(1.1);
    background-color: white;
    box-shadow: 0px 4px 10px rgba(168, 172, 176, 0.438);
  }
`;

const Image = styled.div`
  cursor: pointer;
  width: 354px;
  height: 330px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`;

const OutOfStock = styled.div`
  background: #ffffff;
  opacity: 0.5;
  width: 100%;
  height: 125%;
  font-family: "Raleway";
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 160%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8d8f9a;
  div {
    position: absolute;
    top: 170px;
  }
`;

const AddToCart = styled.div`
  position: absolute;
  width: 52px;
  height: 52px;
  right: 40px;
  bottom: 82px;
  img {
    cursor: pointer;
    transition: all 0.4s ease;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  cursor: pointer;
  width: 100%;
  padding-left: 50px;
  padding-top: 20px;
`;
const Title = styled.p`
  margin: 0;
  font-family: "Raleway";
  font-style: normal;
  font-weight: 300;
  font-size: 18px;
  line-height: 160%;
  color: #1d1f22;
  text-align: right;
`;
const Price = styled.p`
  margin: 0;
  font-family: "Raleway";
  font-style: normal;
  font-weight: 1000;
  font-size: 18px;
  line-height: 160%;
  color: #1d1f22;
  text-align: right;
`;

class SingleProduct extends Component {
  constructor() {
    super();
    this.state = {
      prodInfo: null,
      isHovering: false,
    };
  }
  handleMouseOver = () => {
    this.setState({
      isHovering: true,
    });
  };
  handleMouseOut = () => {
    this.setState({
      isHovering: false,
    });
  };
  setProdInfo = (value) => {
    this.setState({
      prodInfo: value,
    });
  };

  async getProductData() {
    fetch("http://localhost:4000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: GET_SINGLE_PROD_INFO,
        variables: { id: this.props.product.id },
      }),
    })
      .then((res) => res.json())
      .then((data) => this.setProdInfo(addKey(data.data)));
  }
  componentDidMount() {
    this.getProductData();
  }

  render() {
    const addToBasket = async () => {
      // Selecting first product atribut as selected to add product from main Page.
      this.state.prodInfo.attributes.map((x) => (x.items[0].isSelected = true));
      let productCopy = { ...this.state.prodInfo };

      //Cheking if there is already product with same atributes in basket
      await sameOrDifferentCheck(productCopy);

      /* Updating basket Qty */

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
      <Container
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
      >
        {this.state.prodInfo && (
          <Container>
            <Link
              to={
                this.state.prodInfo.inStock
                  ? `productPage/${this.state.prodInfo.id}`
                  : null
              }
            >
              <Image
                className="image"
                style={{
                  backgroundImage: `url(${this.state.prodInfo.gallery[0]})`,
                }}
              >
                {this.state.prodInfo.inStock ? null : (
                  <OutOfStock>
                    <div>OUT OF STOCK</div>
                  </OutOfStock>
                )}
              </Image>
            </Link>

            <AddToCart>
              <img
                onClick={this.state.prodInfo.inStock ? addToBasket : null}
                src={cirkleIcon}
                alt=""
                style={{ opacity: this.state.isHovering ? 1 : 0 }}
              />
            </AddToCart>

            <InfoContainer>
              <Link to={`/productPage/" + ${this.state.prodInfo.id}`}></Link>
              <Title>{this.state.prodInfo.name}</Title>
              <Price>
                {getPrice(
                  this.state.prodInfo,
                  this.props.state.selectedCurrency
                )}
              </Price>
            </InfoContainer>
          </Container>
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
export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
