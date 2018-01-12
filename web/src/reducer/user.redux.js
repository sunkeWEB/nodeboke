const LOAD_DATA = 'LOAD_DATA';
const LOGOUT = 'LOGOUT';
const init = {
    isAuth: false,
    msg: '',
    redicertTo: '',
    name: '',
    avatar: '',
    job: '',
    sex: '',
    desc: '',
    phone:'',
    email:''
};

export function users(state = init, action) {
    switch (action.type) {
        case LOAD_DATA:
            let payloads = action.payload;
            return {...state, name: payloads.name, phone: payloads.phone, isAuth: true};
        default:
            return state;
    }
}

export function LoadDate({name,phone}) {
    return {type:LOAD_DATA,payload:{name,phone}}
}
