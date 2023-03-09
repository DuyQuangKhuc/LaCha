import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./product.css"

const ProductComponent = () => {
  const products = useSelector((state) => state.allProducts.products);
  const renderList = products.map((product) => {
    const { id, namePack, image, price, status } = product;
    return (
      <div className="four wide columm" key={id}>
        <Link to={`/products/${id}`}> 
          <div className="ui link cards">
            <div className="card">
              <div className="image">
                <img src={image} alt={namePack} />  
              </div>
              <div className="content">
                <div className="header">{namePack}</div>
                <div className="meta price">$ {price}</div>
                <div className="meta">{status}</div>
              </div>
            </div>
          </div>
          <br/>
        </Link>
      </div>
    );
  });
  return <>{renderList}</>;
};

export default ProductComponent;