// Retrieve initial state from localStorage if available
const getInitialCart = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
};

const handleCart = (state = getInitialCart(), action) => {
  const product = action.payload;
  let updatedCart;

  switch (action.type) {
    case "ADDITEM":
      const exist = state.find((x) => x.productID === product.productID);
      // Check if product already in cart
      if (exist) {
        // Increase the quantity
        updatedCart = state.map((x) =>
          x.productID === product.productID ? { ...x, qty: x.qty + 1 } : x
        );
      } else {
        updatedCart = [...state, { ...product }];
      } 
     
      // Update localStorage
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;

    case "DELITEM":
      const exist2 = state.find((x) => x.productID === product.productID);
      if (exist2.qty === 1) {
        updatedCart = state.filter((x) => x.productID !== exist2.productID);
      } else {
        updatedCart = state.map((x) =>
          x.productID === product.productID ? { ...x, qty: x.qty - 1 } : x
        );
      }
      // Update localStorage
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
      case "ADDPRODUCT":
      // Check if product already in cart
      const exist3 = state.find((x) => x.productID === product.productID);
      if (exist3) {
        // Increase the quantity
        updatedCart = state.map((x) =>
          x.productID === product.productID ? { ...x, qty: x.qty + product.qty } : x
        );
      } else {
        updatedCart = [...state, { ...product }];
      }
      // Update localStorage
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
      case "DELPRODUCT":
        const exist4 = state.find((x) => x.productID === product.productID);
          updatedCart = state.filter((x) => x.productID !== exist4.productID);
  
        // Update localStorage
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return updatedCart;

        case "CLEARCART":
          // Update localStorage
          localStorage.clear();
          return [];

    default:
      return state;
  }
};

export default handleCart;
