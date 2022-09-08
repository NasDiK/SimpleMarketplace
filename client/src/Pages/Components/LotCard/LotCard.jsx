import React from 'react';
import s from './LotCard.module.css';
import {Link} from "react-router-dom";

const lotCard = (props)=>{
    return(<div className={s.cardWrapper}>
        <h5 align={'center'}><Link to={`/profile/${props.lot.nickname}`}>{props.lot.nickname}</Link></h5>
        <img src={`${''/*TODO связать*/}`} alt={'Фото'} className={s.cardImg}/>
        <p className={'block-center'}>{props.lot.name}</p>
        <p className={'block-center'}>Цена: {props.lot.price} рублей</p>
        <div style={{'margin':'0 auto','display':'block','width':'fit-content'}}>


        <button type={'button'} className={'btn btn-primary'} disabled={props.status !=='Client'} onClick={()=>{
            if(window.confirm('Вы действительно хотите приобрести данный товар?')) {
                fetch(`http://localhost:3001/buyLot`,{
                    method:'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body:JSON.stringify({lotID:props.lot.id,BuyerID:props.BuyerID,sellerID:props.lot.SellerID})
                }).then(result=>{
                    if(result.ok) {
                        alert('Успешно. ' + 'ID товара: ' + props.lot.id);
                    }
                    else alert('Произошла ошибка, повторите попытку позже...');
                }).catch(err=>console.log(err));

            }
            else alert('Отказано');
        }
        }><b>Купить</b></button>&nbsp;&nbsp;&nbsp;
            {props.status==='Admin' ? <button className="btn btn-danger" onClick={()=>{
                if(window.confirm('Действительно хотите удалить данный лот?'))
                    fetch(`http://localhost:3001/deleteLot/${props.lot.id}`, {
                        method: 'DELETE',
                    }).then(result => alert('Удален лот с ID: ' + props.lot.id))
                        .catch(err => {
                            console.log(err);
                            alert('Произошла ошибка');
                        })
            }
            }><b>Удалить</b></button>:null}
        </div>
    </div>);
};

export default lotCard;