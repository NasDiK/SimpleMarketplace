import React, {useEffect, useState} from 'react';
import s from './MyOrders.module.css';

const LotBox = (props) => {
    return (<div className={s.LotBoxWrapper}>
        <div className={s.infoBlock}>
            <img src="" alt="Фото" className={`${s.LotBoxIcon}`}/>
            <p className={s.LotBoxCaption}>{props.lot.name}</p>
            <p className={s.LotBoxCosts}><b>Цена: </b>{props.lot.price} ₽</p>
        </div>
        <div className={`${s.infoBlock} ${s.StatusWrapper}`}>
            <p>Продавец: {props.lot.SellerNickname}</p>
        </div>

    </div>);
};

const MyOrders = (props) => {
    const [lots, setLots] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:3001/getMyOrders/${props.state.user.id}`, {
            method: 'GET'
        }).then(result => result.json())
            .then(result => {
                setLots(result.list);
            })
    }, []);

    return (
        <>
            {props.state.user.status==='Client' ? <>
                <h2>Мои покупки:</h2><hr/>
                {lots.map((lot,index)=><LotBox key={index} lot={lot}/>)}
            </>:<h2>Нет доступа</h2>}
        </>

    );
};

export default MyOrders;