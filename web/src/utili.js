import moment from 'moment';
export function befoderDay (oldtime) {
    let oldtimes =  getNowTime(new Date(oldtime));  // 获取到旧时间
    let nowtimes = getNowTime(new Date()); // 获取新的时间
    // console.log(moment([2018, 0,10,12,12]).diff([2018, 0,10,11], 'hour')); //小时
    // console.log(moment([2018, 0,10,12,12]).diff([2018, 0,10,12,10], 'minute'))

    if (moment(nowtimes).diff(oldtimes, 'year') >= 1) {  // 几年前
        return `${moment(nowtimes).diff(oldtimes, 'year')}年前`;
    }

    if (moment(nowtimes).diff(oldtimes, 'month') >= 1) {  // 几月前
        return `${moment(nowtimes).diff(oldtimes, 'month')}月前`;
    }

    if (moment(nowtimes).diff(oldtimes, 'days') >= 1) {  // 几天前
        return `${moment(nowtimes).diff(oldtimes, 'days')}天前`;
    }

    if (moment(nowtimes).diff(oldtimes, 'hour') >= 1) {  // 几小时前
        return `${moment(nowtimes).diff(oldtimes, 'hour')}小时前`;
    }

    if (moment(nowtimes).diff(oldtimes, 'minute') >= 1) {  // 几分钟前
        return `${moment(nowtimes).diff(oldtimes, 'minute')}分钟前`;
    }
}

function getNowTime(time) {
    const year = time.getFullYear();
    const month = time.getMonth();
    const day = time.getDate();
    const hour = time.getHours();
    const minute = time.getMinutes();
    return [year,month,day,hour,minute];
}