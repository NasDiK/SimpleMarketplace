import React, {useEffect, useRef, useState} from 'react';
import s from './MyLots.module.css';
import Modal from "../../Components/ModalWindow/ModalWindow";

const LotBox = (props) => {
    return (<div className={s.LotBoxWrapper}>
        <div className={s.infoBlock}>
            <img src="" alt="Фото" className={`${s.LotBoxIcon}`}/>
            <p className={s.LotBoxCaption}>{props.lot.name}</p>
            <p className={s.LotBoxCosts}><b>Цена: </b>{props.lot.price} ₽</p>
        </div>
        <button className={`btn-close btn ${s.infoBlock} ${s.StatusWrapper} ${s.closeButton}`} onClick={() => {
            if (window.confirm('Вы действительно хотите удалить позицию?')) {
                props.deleteLot(props.lot.id);
            }
            else alert('Действие отменено');
        }}></button>
        <div className={`${s.infoBlock} ${s.StatusWrapper}`}>
            <p>Статус: {props.lot.BuyerID ? 'Продано':'Выставлено на продажу'}</p>
        </div>

    </div>);
};

const MyLots = (props) => {
    const [lots, setLots] = useState(
    //     [
    //     {
    //         name: 'Блютуз',
    //         cost: '999',
    //         status: 'Продано',
    //     },
    //     {
    //         name: 'ИК-Порт',
    //         cost: '19000',
    //         status: 'Выставлено на продажу',
    //     }
    // ]
        []
    );

    function getLots(){
        fetch(`http://localhost:3001/getMyLots/${props.state.user.id}`,{
            method:'GET'
        })
            .then(result=>result.json())
            .then(result=>setLots(result.list))
            .catch(err=>console.log(err));
    }

    useEffect(()=>{
        getLots()
    },[])
    const [showModal, setShowModal] = useState(false)

    const nameLot = useRef('');
    const costLot = useRef('');
    const fileLot = useRef('');

    const deleteLot = (id)=>{
        fetch(`http://localhost:3001/deleteLot/${id}`,{
            method:'DELETE',
        }).then(result=>getLots()).catch(err=>console.log(err));

    }

    return (<>
        {props.state.user.status === 'Seller' ? <>
            <Modal active={showModal} setActive={setShowModal}>
                <h2>Добавить товар</h2>
                <hr/>
                <input type="text" name="" id="" className="form-control mb-3" placeholder={'Название товара'} ref={nameLot}/>
                <div className="input-group mb-3">
                    <input type="text" name="" id="" className="form-control " placeholder={'Цена'}  ref={costLot}/>
                    <span className="input-group-text ">₽</span>
                </div>

                <input type="file" name="" id="" className="form-control mb-3" placeholder={'Фото'}  ref={fileLot}/>
                <button className="btn btn-primary mb-3" onClick={() => {
                    if (window.confirm('Подтвердите выставление позиции')) {
                        alert('Выставлено');
                        const newLot = {
                            name:nameLot.current.value,
                            price:costLot.current.value,
                            SellerID:props.state.user.id
                        };
                        fetch('http://localhost:3001/addLot',{
                            method:'POST',
                            headers: {
                                'Content-Type': 'application/json;charset=utf-8'
                            },
                            body:JSON.stringify(newLot)
                        }).then(result=>getLots()).catch(err=>console.log(err));


                    }
                    else alert('Отменено');
                }}>Добавить
                </button>
            </Modal>
            <h2>Мои товары: </h2>
            <hr/>
            {lots.length === 0 ? <b>Нет активных позиций</b> : lots.map((el, index) => <LotBox key={index} lot={el} deleteLot={deleteLot}/>)}
            <button className={'btn btn-primary mt-3'} role={'button'} style={{'display': 'block'}}
                    onClick={() => setShowModal(true)}>Добавить
            </button>
        </>:<h2>Нет доступа</h2>}
    </>);
};

export default MyLots;
