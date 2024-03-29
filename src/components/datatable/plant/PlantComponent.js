import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AuthContext } from "../../../context/AuthContext";


const PlantComponent = () => {
  const products = useSelector((state) => state.allProducts.products);
  const { currentUser } = useContext(AuthContext);
  const renderList = products.map((product) => {
    const { id, nameTree, image, price, status } = product;
    return (
      <div className="four wide columm" key={id}>
        <Link
          to={currentUser.roleId === 0 ? `/plants` : `/plants/${id}`}
        >
          <div className="ui link cards">
            <div className="card">
              <div className="image">
                <img src={image} alt={nameTree} />
              </div>
              <div className="content">
                <div className="header">{nameTree}</div>
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

export default PlantComponent;