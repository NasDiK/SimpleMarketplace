import React, {useEffect, useState} from 'react';
import LotCard from "../../Components/LotCard/LotCard";
import s from './Market.module.css';

const Market = (props)=>{
    const [lots,setLots] = useState([]);
    useEffect(()=>{
        fetch('http://localhost:3001/getLots',{
            method:'GET'
        }).then(result=>result.json()).then((result)=> {
            setLots(result.list);
        });
    },[])
    return(<>
        {lots.length === 0 ? <h2>Нет активных позиций</h2>:<div className={s.marketWrapper}>
            {lots.map((lot,index)=><LotCard key={index} lot={lot} BuyerID={props.state.user.id} status={props.state.user.status}/>)}
        </div>}
    </>);
}

export default Market;