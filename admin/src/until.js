export  function formatDate(nows) {
    let now = new Date(nows);
    let year = now.getFullYear();
    let month = now.getMonth() + 1 ;
    let date = now.getDate();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();
    if (month<10) {
        month = '0' + month;
    }
    if (date<10) {
        date = '0' + date;
    }
    if (hour<10) {
        hour = '0' + hour;
    }
    if (minute<10) {
        minute = '0' + minute;
    }
    if (second<10) {
        second = '0' + second;
    }
    return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
}