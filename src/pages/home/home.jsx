import "./home.scss";

import { Switch, Route } from "react-router";
import { Fragment, useEffect, useState, useRef } from "react"
import { Link } from "react-router-dom";

import Header from "../../components/Header/header";
import Restaurant from "../restaurant/restaurant";
import Footer from "../../components/Footer/footer";

function Home() {
    const [a, b] =  useState(null)
console.log(a);
    const [category, setCategory] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    
    useEffect(() => {
        fetch('https://my-restaurantm.herokuapp.com/T_Express/v1/')
        .then((res) => res.json())
        .then((data) => {
            setCategory(data)
        });
    },[])

  


    return <Fragment>
        
        <Switch>
            <Route path={`/:kitchen/:category/:rest`}><Restaurant></Restaurant></Route>
            <Route path='/' exact>
                <Header category={category} categoryInput={b} setRestaurants={setRestaurants}/>
                <div className="intro">
                    {restaurants.length > 0 &&(
                        <ul className="restaurants">
                        {restaurants.map(type =>(
                            <li key={type.restaurant_id}>
                                <Link className="restaurant_card" to={`/${type.restaurant_name.split(" ").join("-")}/${a}/${type.restaurant_id}`}>
                                    <div className="card">
                                        <img src={type.restaurant_img} alt="" width='300' height='300'/>
                                    </div>
                                </Link>
                            </li>
                        ))}
                        </ul>
                    )}
                </div>
                <Footer />
            </Route>
        </Switch>

    </Fragment> 
}

export default Home;
