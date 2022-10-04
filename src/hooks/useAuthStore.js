//Esto reemplaza al thunks

import { useDispatch, useSelector } from "react-redux"
import { calendarApi } from '../api'
import { clearErrorMessage, onChecking, onLogin, onLogout, onLogoutCalendar } from "../store";

export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const startLogin = async ({ email, password }) => {
        dispatch(onChecking());

        try {
            const { data } = await calendarApi.post('/auth', { email, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ name: data.name, uid: data.uid }));


        } catch (error) {

            dispatch(onLogout('Credenciales incorrectas'));

            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }

    const startRegistration = async ({ user, email, password, password2 }) => {

        dispatch(onChecking());

        console.log(user, email, password, password2)
        try {
            const { data } = await calendarApi.post('/auth/new', { name: user, email, password });
            console.log({ data })
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ name: data.name, uid: data.uid }));

        } catch (error) {
            dispatch(onLogout(error.response.data.msg));
            console.log({ error })
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }

    const checkAuthToken = async () => {

        const token = localStorage.getItem('token');
        if (!token) return dispatch(onLogout());

        try {
            const { data } = await calendarApi.get('auth/renew');
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ name: data.name, uid: data.uid }));
        } catch (error) {
            localStorage.clear();
            dispatch(onLogout());
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogoutCalendar())
        dispatch(onLogout());
    }

    return {

        //propiedades
        status,
        user,
        errorMessage,


        //metodos
        startLogin,
        startLogout,
        startRegistration,
        checkAuthToken
    }
}