import Cookies from 'js-cookie';

const SetCookie = (cookieName, cookieDetails) => {
    Cookies.set(cookieName, cookieDetails, {
        expires: 1, // expires in one day
        secure: true,
        sameSite: 'strict',
        path:'/'
    }); 
}

export default SetCookie;