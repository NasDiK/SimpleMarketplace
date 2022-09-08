import React, {useEffect, useRef, useState} from 'react';

const AdminPanel = (props)=>{
    const [users,setUsers] = useState(()=>[]);

    useEffect(()=>{
        fetch('http://localhost:3001/getAllUsers',{
            method:'GET',
        }).then(result=>result.json()).then(result=>setUsers([...result.list]))
    },[]);

    const SelectRef = useRef('');

    return(<>
        {props.status ==='Admin' ?  <>
                <h2>Админ-панель</h2><hr/>
                <div className={`form-control`}><p className={`mb-3`}><b>Список пользователей:</b></p>
                    <select size="5" aria-label="size 3 select example" className="form-select mb-3" ref={SelectRef}>
                        {users.map((el,index)=><option value={el.id}>{el.nickname}</option>)}
                    </select>
                    <button className="btn btn-danger" onClick={()=>{
                        if(SelectRef.current.value === '') return;
                        fetch('http://localhost:3001/deleteUser',{
                            method:'DELETE',
                            headers:{
                                'Content-Type':'application/json;charset=utf-8'
                            },
                            body:JSON.stringify({
                                userID:SelectRef.current.value
                            })
                        })
                            .then(result=>alert('Успешно'))
                            .then(()=>setUsers([...users]))
                            .catch(err=> {
                                alert('Операция закончилась ошибкой');
                            })
                    }
                    }>Удалить</button>&nbsp;&nbsp;&nbsp;&nbsp;
                </div>
            </>:<h2>Нет доступа</h2>}
        </>
    );
};

export default AdminPanel;