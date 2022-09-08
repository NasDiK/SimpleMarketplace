import {action, makeObservable, observable} from "mobx";

class MainState {
    user = {
        // id: 1,
        // nickname: 'NasDiK',
        // status: 'Seller',
        // // status:'Client',
        // // status:'Admin',
        isLogged: false,
    }


    constructor() {
        makeObservable(this, {
            user: observable,
            logIn: action,
            logOut: action,
        });
    }

    logIn(data) { //{login:'blabla',password:'bla-bla'}
        fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(data),
            }
        ).then(async result => {
            if (result.ok) {
                result.json().then(newRes => {
                    this.user = {
                        id: newRes.list.id,
                        nickname: newRes.list.nickname,
                        status: newRes.list.status,
                        registerDate: newRes.list.registerDate,
                        dealsCompleted: newRes.list.dealsCompleted,
                        isLogged: true,
                    }
                });
            } else {
                alert('Неправильный логин или пароль');
            }

        })
    }

    logOut() {
        this.user = {
            isLogged: false
        };
    }


}

export default observable(new MainState());