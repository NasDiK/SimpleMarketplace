import logo from './logo.svg';
import './App.css';
import MainPage from "./Pages/MainPage/MainPage";
import 'bootstrap/dist/css/bootstrap.css';
import AuthPage from "./Pages/AuthPage/AuthPage";
import MainState from "./States/MainState";
import {observer} from "mobx-react";

function App() {
    return (
        <div className={'app-wrapper'}>
            {

                MainState.user.isLogged ? <MainPage state={MainState}/>:<AuthPage state={MainState}/>
            }
        </div>
    );
}

export default observer(App);
