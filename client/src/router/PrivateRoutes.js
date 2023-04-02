import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';
import { useContext } from 'react';

const PrivateRoutes = () => {

    const { auth } = useContext(AuthContext);

    return (
        auth ? <Outlet/> : <Navigate to='/login'/>
    )
}

export default PrivateRoutes;