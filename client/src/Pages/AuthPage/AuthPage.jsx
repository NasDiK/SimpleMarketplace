import React, {useRef, useState} from 'react';
import s from './AuthPage.module.css';

const Auth = (props) => {

    const [isRegistered,setIsRegistered] = useState(true);

    let loginNickname=useRef('');
    let loginPassword=useRef('');

    const [isPasswordCorrect,setIsPasswordCorrect]=useState(true);

    let registerNickname=useRef('');
    let registerPassword=useRef('');
    let registerVerifyPassword=useRef('');
    let registerRole=useRef('');


    return (
        <div className={`${s.wrapper}`}>
            {isRegistered ?
                // <form>
                <div className={s.AuthWrapper}>
                    <div className={s.AuthHeader}>
                        <b>Авторизация</b>
                    </div>
                    <div className={s.AuthContent}>
                        <input type="text" name="log_nickname" id="log_nickname" placeholder={'Имя пользователя'} ref={loginNickname} className={'form-control mb-3'}/>
                        <input type="password" name="log_password" id="log_password" placeholder={'Пароль...'} ref={loginPassword} className={'form-control mb-3'}/>
                        <input type="submit" value="Войти" className="btn btn-success" onClick={()=>{props.state.logIn({login:loginNickname.current.value,password:loginPassword.current.value})}}/>
                    </div>
                    <b className={s.title}>Не зарегистрированы? <span onClick={()=>setIsRegistered(!isRegistered)}>Зарегистрироваться</span></b>

                </div>
            // </form>
                :
                // <form>
                    <div className={s.AuthWrapper}>
                        <div className={s.AuthHeader}>
                            <b>Авторизация</b>
                        </div>
                        <div className={s.AuthContent}>
                            <input type="text" name="reg_username" id="reg_username" placeholder={'Имя пользователя'} ref={registerNickname} className={'form-control mb-3'}/>
                            <input type="password" name="reg_password" id="reg_password" placeholder={'Пароль...'} ref={registerPassword}  onChange={(ev)=>{
                                if(ev.target.value!==registerVerifyPassword.current.value) setIsPasswordCorrect(false);
                                else setIsPasswordCorrect(true);}
                            } className={'form-control mb-3'}/>
                            <input type="password" name="VerPas" id="verifyPass" placeholder={'Подтвердите пароль...'} ref={registerVerifyPassword} onChange={(ev)=>{
                                if(ev.target.value!==registerPassword.current.value) setIsPasswordCorrect(false);
                                else setIsPasswordCorrect(true);
                            }} className={'form-control mb-3'}/>
                            {!isPasswordCorrect ? <div className="alert alert-danger" role={'alert'}>
                                &#10060;&nbsp;Пароли не совпадают
                            </div>:null}
                            <select name="role" id="role" className={`form-select mb-3`} ref={registerRole}>
                                <option value="Seller">Я - продавец</option>
                                <option value="Client">Я - покупатель</option>
                            </select>
                            <input type="submit" value="Зарегистрироваться" className="btn btn-success" onClick={()=>{
                                const newUser = {
                                    nickname:registerNickname.current.value,
                                    password:registerPassword.current.value,
                                    role:registerRole.current.value
                                };
                                console.log(newUser);
                                fetch('http://localhost:3001/registerUser',{
                                    method:'POST',
                                    headers: {
                                        'Content-Type': 'application/json;charset=utf-8'
                                    },
                                    body:JSON.stringify(newUser)
                                }).then(result=>{
                                    if(result.ok){
                                        props.state.logIn({login:registerNickname.current.value,password:registerPassword.current.value});
                                    }
                                    else{
                                        alert('Произошла ошибка. Попробуйте позже!');
                                    }
                                }).catch(err=>console.log(err));
                            }}/>
                        </div>
                        <b className={s.title}>Уже зарегистрированы? <span onClick={()=>setIsRegistered(!isRegistered)}>Залогиниться</span></b>

                    </div>
                // </form>
            }

        </div>);
}

export default Auth;