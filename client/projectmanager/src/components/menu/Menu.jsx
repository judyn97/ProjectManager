import "./Menu.css";
import { useState } from "react";
import {Link} from "react-router-dom";
import {menu} from "../../menudata"

const Menu = () => {
  const [selectedItem, setSelectedItem] = useState();
  console.log("Select", selectedItem)

  return (
    <div className="menu">
      {menu.map((item)=>(
        <div className="item" key={item.id}>
          <span className="title">{item.title}</span>
          {item.listItems.map((listItem)=>(
            <Link className={(selectedItem === listItem.title) ? 'active listItem' : 'listItem'} to={listItem.url} key={listItem.id} onClick={() => setSelectedItem(listItem.title)}>
            <img src={listItem.icon} alt="" />
            <span className="listItemTitle">{listItem.title}</span>
            </Link>
          ))}
        </div>
      ))}
    </div>
  )
}

export default Menu;