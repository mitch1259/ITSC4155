import Cookies from 'js-cookie';

const RemoveCookie = (cookieName) => {
    Cookies.remove(cookieName); 
}

export default RemoveCookie;