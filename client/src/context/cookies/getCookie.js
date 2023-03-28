import Cookies from 'js-cookie';

const GetCookie = (cookieName) => {
    return Cookies.get(cookieName); 
}

export default GetCookie;