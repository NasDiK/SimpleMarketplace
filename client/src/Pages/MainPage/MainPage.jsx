import React from 'react';
import {Link, Route, Router} from "react-router-dom";
import s from './MainPage.module.css';
import Market from "./Market/Market";
import {Routes} from "react-router";
import MainState from "../../States/MainState";
import UserProfile from "./UserProfile/UserProfile";
import MyLots from "./MyLots/MyLots";
import MyOrders from "./MyOrders/MyOrders";
import AdminPanel from "./AdminPanel/AdminPanel";


const MainPage = (props)=>{
    return(
      <>
          <div className="header">
            <Link to={'/'} style={{'position':'absolute','left':'5px','marginLeft':'5px'}}>Главная</Link>
              <div className={`${s.navMenu}`}>
                  {props.state.user.status==='Admin' ? <Link to={'/adminpanel'}>Админ-панель</Link> :null}
                  {props.state.user.status==='Seller' ? <Link to={'/lots'}>Мои товары</Link>: props.state.user.status==='Client' ? <Link to={'/orders'}>Мои покупки</Link> : null}
                  <Link to={'/profile/my'}>Мой профиль</Link>
                  <Link to={'/exit'} onClick={()=>props.state.user.logOut()}>Выход</Link>
              </div>

          </div>
          <div className="content">
              <Routes>
                  <Route path={'*'} element={<Market state={MainState}/>}/>
                  <Route path={'/adminpanel'} element={<AdminPanel status={props.state.user.status}/>}/>
                  <Route path={'/profile/:nickname'} element={<UserProfile state={props.state}/>}/>
                  <Route path={'/orders'} element={<MyOrders state={props.state}/>}/>
                  <Route path={'/lots'} element={<MyLots state={MainState}/>}/>
              </Routes>
          </div>
          <div className="footer">
              <b>Выполнил Тунгусов Александр  © Август 2022</b>
          </div>
      </>
    );
}

export default MainPage;