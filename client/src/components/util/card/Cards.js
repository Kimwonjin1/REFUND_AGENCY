import React, {useState} from "react";
import { Link } from "react-router-dom";
import Loading from '../Loading/Loading'
import './Cards.css';

function Cards({product, isAdmin, handleCheck, deleteProduct}) { 

  var searchies = document.querySelector(".fas")

  


  return (
    <div className="product_card">
      <div className="box">
     
            <img src={product.images.url} alt="" />
  

        {isAdmin && <input type="checkbox" checked={product.checked} onChange={() => handleCheck(product._id)}/>}
        <div className="product_box">
          <h2 title={product.title}>{product.title}</h2>
         
          {isAdmin && (
            <>
              <Link id="btn_delete" to="#!" onClick={() => deleteProduct(product._id, product.images.public_id)}>
                삭제
              </Link>
              <Link id="btn_edit" to={`/edit_product/${product._id}`}>
                수정
              </Link>
            </>
          )}
          <Link id="btn_view" to={`/detail/${product._id}`}>
            <i className="fas fa-search"></i>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cards;