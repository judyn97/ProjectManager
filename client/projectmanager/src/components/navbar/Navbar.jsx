import "./Navbar.css"

const Navbar = () => {
  return (
    <div className="navbar">
        <div className="logo">
            <img src="./assets/react.svg" alt=""/>
            <span>Pidishi Project Manager</span>
        </div>
        <div className="icons">
            <img src="" alt="" className="icon"/>
            <img src="" alt="" className="icon"/>
            <img src="" alt="" className="icon"/>
            <div className="user">
             <img src="/assets/react.svg" alt="" className="icon"/>
             <span>Jalal</span>
            </div>
        </div>
    </div>
    
  )
}

export default Navbar;