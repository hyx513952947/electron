import React from 'react';
import ReactDOM from 'react-dom';
import HomeDrawView from "../componments/HomeDrawView";
import LeftMenuItems from "../componments/HomeLeftMenuItems"

function App() {
    return <HomeDrawView menuList={LeftMenuItems}/>
}
ReactDOM.render(<App/>,document.getElementById('root'));