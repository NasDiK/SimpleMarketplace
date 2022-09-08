import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router";
import s from './UserProfile.module.css';
import {Link} from "react-router-dom";

const UserProfile = (props) => {
    const path = useLocation();
    let nickname = path.pathname.split('/')[2];
    nickname = nickname === 'my' ? props.state.user.nickname : nickname;
    let [userInfo, setUserInfo] = useState(() => {
        return {}
    });

    useEffect(() => {
        fetch(`http://localhost:3001/getUserInfoByNickname/${nickname}`, {
            method: "GET"
        })
            .then(result => result.json())
            .then(result => {
                console.log(result);
                const regDate = new Date(result.registerDate);
                setUserInfo({
                    ...result,
                    registerDate: `${regDate.getDate() <= 9 ? `0${regDate.getDate()}` : regDate.getDate()}.${regDate.getMonth() <= 8 ? `0${regDate.getMonth() + 1}` : regDate.getMonth() + 1}.${regDate.getFullYear()}`,
                })
            });
    }, []);

    const getStatus = (status) => {
        switch (status) {
            case'Seller':
                return 'Продавец'
            case 'Client':
                return 'Клиент';
            case 'Admin':
                return 'Администратор';
            default:
                return ('undefined');
        }
    };

    const [activeLots, setActivelots] = useState([]);

    return (
        <div>
            <h3>Профиль пользователя</h3>
            <hr/>
            <div className={`flex ${s.infoWrapper}`}>
                {/*<img src="" alt="Фото профиля" className={`${s.profilePhoto} flex`}/>*/}
                <div className={``}>
                    <p><b>Имя пользователя: {userInfo.nickname}</b></p>
                    <p><b>Статус: {getStatus(userInfo.status)}</b></p>
                    <p><b>Дата регистрации: {userInfo.registerDate}</b></p>
                    <p><b>Завершенных сделок: {userInfo.dealsCompleted}</b></p>
                    {props.state.user.status === 'Admin' && userInfo.status !== 'Admin' ? <div>
                        <button className="btn btn-danger" onClick={() => {
                            if (window.confirm('Подтвердите удаление пользователя с ником: ' + userInfo.nickname)) {
                                fetch('http://localhost:3001/deleteUser', {
                                    method:"DELETE",
                                    headers:{
                                        'Content-Type':'application/json;charset=utf-8'
                                    },
                                    body:JSON.stringify({
                                        userID:userInfo.id,
                                        userNickname:userInfo.nickname
                                    }),
                                })
                                    .then(result => alert('Успешно'))
                                    .catch(err => {
                                        console.log(err);
                                        alert('Ошибка удаления пользователя');
                                    })
                            }
                        }
                        }>Удалить пользователя
                        </button>
                    </div> : null}
                </div>

            </div>
            {userInfo.status === 'Seller' ?
                <div>
                    <hr/>
                    <h4 style={{'borderBottom': '1px solid black', 'width': 'fit-content'}}>Активные лоты</h4>
                    <div>
                        {activeLots.length === 0 ? <p>Нет активных позиций</p> : activeLots.map((el, index) => <p
                            key={index}>ID: {el.id} | {el.name} | {el.price} ₽ &nbsp;&nbsp;
                            {props.state.user.status === 'Client' ? <button
                                className="btn btn-dark" onClick={()=>{
                                if(window.confirm('Вы действительно хотите приобрести данный товар?')) {
                                    fetch(`http://localhost:3001/buyLot`,{
                                        method:'POST',
                                        headers: {
                                            'Content-Type': 'application/json;charset=utf-8'
                                        },
                                        body:JSON.stringify({lotID:el.id,BuyerID:props.state.user.id,sellerID:el.SellerID})
                                    }).then(result=>{
                                        if(result.ok) {
                                            alert('Успешно. ' + 'ID товара: ' + props.lot.id);
                                        }
                                        else alert('Произошла ошибка, повторите попытку позже...');
                                    }).catch(err=>console.log(err));

                                }
                                else alert('Отказано');
                            }}>Купить</button> : null}</p>)}
                        <button className="btn btn-primary" onClick={() => {
                            fetch(`http://localhost:3001/getActiveLotsBySellerID/${userInfo.id}`, {
                                method: "GET"
                            })
                                .then(result => result.json()).then(result => {
                                setActivelots([...result.list])
                            });
                        }
                        }>Обновить
                        </button>
                    </div>
                </div> : null}
        </div>

    );
};

export default UserProfile;