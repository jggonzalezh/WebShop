// For Add Item to Cart
export const addCart = (product) =>{
    return {
        type:"ADDITEM",
        payload:product
    }
}

// For Delete Item to Cart
export const delCart = (product) =>{
    return {
        type:"DELITEM",
        payload:product
    }
}

// For Add A Product
export const addProduct = (product) =>{
    return {
        type:"ADDPRODUCT",
        payload:product
    }
}

// For Delete a Product
export const delProduct = (product) =>{
    return {
        type:"DELPRODUCT",
        payload:product
    }
}

export const clearCart = (product) =>{
    return {
        type:"CLEARCART",
        payload:null
    }
}

