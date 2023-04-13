module.exports = {
    isEmail: (email) => {
        if ((!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) && !(email.length === 0)) {
            return false;
        }
        return true;
    },
    hasWhiteSpaceAndValidLength: (s) => {
        return (s.indexOf(" ") >= 0 || s.length < 6) && !(s.length === 0);
    },
    enoughNumCountPass: (s) => {
        return (s.length < 6 && !(s.length === 0))
    },
    isEmpty: (s) => {
        return s === "" || s.length === 0;
    },
    getHoursBetween: (time1, time2) => {
        const diffInMs = Math.abs(time2 - time1)
        let diff = Math.floor(diffInMs / (1000 * 60 * 60))
        if (diff < 1) return (`${Math.floor(diffInMs / 60000)} m`)
        else if (diff > 24) return (`${Math.floor(diff / 24)} d`)
        else return (`${diff} h`)
    },
    compare: (a,b) => {
        if (a.time > b.time) return 1;
        if (b.time > a.time) return -1;
        return 0
    }
}