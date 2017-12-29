import axios from 'axios';

const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const ERR_MSG = 'ERR_MSG';
const UPDATE_SUCCESS = 'UPDATE_SUCCESS';
const LOGOUT = 'LOGOUT';
const init = {
    isAuth: false,
    user: '',
    msg:'',
    redicertTo:''
};

export function user(state = init, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {...state, isAuth: true,msg:'',...action.payload};
        case UPDATE_SUCCESS:
            return {...state, isAuth: true,msg:'', ...action.payload};
        case LOGOUT :
            return {...init,redicertTo:'/login'};
        case ERR_MSG:
            return {...state, isAuth: false, msg: action.msg};
        default:
            return state;
    }
}

function loginSuccess (data) {
    return {type:LOGIN_SUCCESS,payload:data}
}

function errMsg (msg) {
    return {type:ERR_MSG,msg:msg}
}

export function Logins({user, pwd}) {
    return dispatch => {
        axios.post('/users/login', {user, pwd}).then(res => {
            if (res.status === 200 && res.data.code === 0) {
                dispatch(loginSuccess(res.data.data));
            }else {
                dispatch(errMsg(res.data.msg));
            }
        });
    }
}

export function loadDate (data) {
   return {type:UPDATE_SUCCESS,payload:data}
}

export function Logout () {
    return {type:LOGOUT}
}