export const GET_PRODUCTS = `
  query category($categorie: String!) {
    category(input: { title: $categorie }) {
      name
      products {
        id
        name
        prices {
          currency {
            label
          }
          amount
        }
        brand
      }
    }
  }
`;
