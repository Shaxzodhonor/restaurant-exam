import "./restaurant.scss"

import { Fragment, useEffect, useState } from "react"
import { useParams } from "react-router-dom";

function Restaurant() {
 
 
  const [allmenu, setMenu] = useState([])
  const [choosed, setChoosed] = useState({open:false, menu: undefined})
  const {kitchen, rest, category} = useParams()
  
  useEffect(() => {
    fetch(`https://my-restaurantm.herokuapp.com/T_Express/v1/${category}/${rest}`)
    .then((res) => res.json())
    .then((data) => setMenu(data));
  },[rest,category])
    
  function handleSubmit(evt){
    evt.preventDefault()
    const {name, email} = evt.target.elements;

    fetch('https://my-restaurantm.herokuapp.com/T_Express/v1/',{
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({name:name.value, email: email.value, meal:choosed.menu.menu_name, price:choosed.menu.menu_price, images:choosed.menu.menu_img})
    })
    .then(res=>res.json())
    .then(data=> console.log(data))

    setChoosed({open:false})
  }

   
    return <Fragment>
       <div className="rest">
        <h1>{kitchen} sizga doimo ilinadi </h1>
          {allmenu.length > 0 && (
              <ul className="menu-card">
              {allmenu.map(menu =>(
                  <li key={menu.menu_id}>
                      <div className="img-wrap">
                        <img src={menu.menu_img} alt="dcd" width={250} height='180' />
                      </div>
                      <div className="content">
                        < h4>{menu.menu_name}</h4>
                        <span>{menu.menu_price}</span>
                        <button type="button" onClick={()=> setChoosed({menu:menu,open:true})}>order</button>
                      </div>
                  </li>
              ))}
              </ul>
            )}
       </div>
      <dialog open={choosed.open} className='dialog'>
        <div className="dialog-content">
          <button type="button" onClick={()=>setChoosed({open:false})}>close</button>
          <div className="dialog-form">
              <form  onSubmit={handleSubmit}>
                <input name="name" type="text" placeholder="Name"/>
                <input name="email" type="email" placeholder="Email"/>
                <button type="submit">submit</button>
              </form>
          </div>
        </div>
      </dialog>
    </Fragment> 
}

export default Restaurant;
