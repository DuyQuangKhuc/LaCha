import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./product.css"
import { AuthContext } from "../../../context/AuthContext";

const ProductComponent = () => {
  const products = useSelector((state) => state.allProducts.products);
  const { currentUser } = useContext(AuthContext);
  const renderList = products.map((product) => {
    const { id, namePack, image, price, status } = product;
    return (
      <div className="four wide columm" key={id}>
        <Link
          to={currentUser.role_ID === 0 ? `/products` : `/products/${id}`}
        >
          <div className="ui link cards">
            <div className="card">
              <div className="image">
                <img src={image} alt={namePack} />
              </div>
              <div className="content">
                <div className="header">{namePack}</div>
                <div className="meta price">$ {price}</div>
                <div className="meta">Status: {status}</div>
              </div>
            </div>
          </div>
          <br />
        </Link>
      </div>
    );
  });
  return <>{renderList}</>;
};

export default ProductComponent;