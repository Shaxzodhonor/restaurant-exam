import "./header.scss";

import { Fragment, useEffect, useRef } from "react"
import { Link } from "react-router-dom";

function Header({category, setRestaurants, categoryInput}) {

    
    function selectCategory(id){

        fetch(`https://my-restaurantm.herokuapp.com/T_Express/v1/${id}`)
        .then((res) => res.json())
        .then((data) => {
            setRestaurants(data)
        });
    }
   

    return <Fragment>
      <div className="header">
        <h1 className="logo">T_<span className="logo-vo">EXPRESS</span></h1>
        <select defaultValue={""}   onChange={(evt)=>{
        
        categoryInput(evt.target.value)           
            selectCategory(evt.target.value)
        }} name="category" id="categoryInput">
            <option  disabled value={""}>Choose category</option>
            {category.map(type =>(
                <option key={type.category_id} value={type.category_id}>{type.category_name}</option>
            ))}
        </select>
        <ul className="header-nav">
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/about">About</Link>
            </li>
            <li>
                <Link to="/contact">Contact</Link>
            </li>
        </ul>
      </div>
    </Fragment> 
}

export default Header;
