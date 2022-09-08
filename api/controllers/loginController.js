const knexfile = require('../knexfile');
const db = require('knex')(knexfile.development);
const logger = require('./logger');

const getLoginStatus = async (data) => { //должна вернуть статус 200-299 OK, все остальное хуйня переделывай
    let res;
    await db.select('*').from('users')
        .where({'nickname': data.login, 'password': data.password})
        .then((result) => {
            res = result;
        });
    return res;
}

const getUserInfoByNickname = async (nickname) => {
    let res;
    await db('users').select('id', 'nickname', 'dealsCompleted', 'status', 'registerDate').where('nickname', nickname).then(x => res = x);
    return res[0];
}

const registerUser = async (data) => {
    await db.insert({
        id: db.defaultValue,
        nickname: data.nickname,
        password: data.password,
        dealsCompleted: 0,
        status: data.role
    }).into('users');
    await logger(`[${new Date().toLocaleTimeString()}]: зарегистрирован новый пользователь. Никнейм: ${data.nickname}`);

}

const deleteUser = async (data) => { //{userID:#,userNickname:#}
    await db('users').where('id', data.userID).del();
    await logger(`[${new Date().toLocaleTimeString()}]: удалён пользователь ID: ${data.userID}.  Nickname: ${data.userNickname}`);
}

const getAllUsers = async () => {
    let res;
    await db('users').select('id', 'nickname').where('status', 'Seller').orWhere('status', 'Client').then(x=>res=x);
    return res;
}


module.exports = {
    getLoginStatus,
    getUserInfoByNickname,
    registerUser,
    deleteUser,
    getAllUsers
}