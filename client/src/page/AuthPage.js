import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { login, registration } from '../http/userApi';
import { setAuth } from '../redux-store/auth-reducer';
import { LOGIN_ROUTER, MAIN_ROUTER, REGISTRATION_ROUTER } from '../utils/constantRouter';
import s from './AuthPage.module.css'

function AuthPage(props) {    
    const navigate = useNavigate()
    const dispath = useDispatch()
    let location = useLocation()
    
    let thisRouterLogin = location.pathname === LOGIN_ROUTER
    const [emailValue, setEmailValue] =useState('')
    const [passwordValue, setPasswordValue] =useState('')    

    const clickAuth = async() => {
        try {
            if(thisRouterLogin) {
                await login(emailValue, passwordValue)
                dispath(setAuth(true))                
                navigate(MAIN_ROUTER)
            } else {
                await registration(emailValue, passwordValue)                
                setEmailValue('')
                setPasswordValue('')
                navigate(LOGIN_ROUTER)               
            }
        } catch(e) {            
            alert(e.response.data.message)           
            setPasswordValue('')
        }
    }
    

    return (
        <div className={s.auth}> 
            <h2 className={s.title}>{thisRouterLogin ? 'Войти' : 'Зарегистрироваться'}</h2>
            <div className={s.form}>
                <div className={s.emailBlock}>
                    <div className={s.formTitile}>Email адрес :</div>
                    <input value={emailValue}  onChange={e => setEmailValue(e.target.value)} className={s.emailInput} />
                </div>
                <div className={s.passwordBlock}>
                    <div className={s.formTitile}>Пароль :</div>
                    <input value={passwordValue}  onChange={e => setPasswordValue(e.target.value)} className={s.emailInput} />
                </div>
                
                {thisRouterLogin ?
                    <div>
                        <button  onClick={clickAuth} className={s.button}>Войти</button>
                        <div className={s.footerBlock}>
                            <span className={s.textFooter}>Нет аккаунта?</span>
                            <NavLink className={s.linkFooter} to={REGISTRATION_ROUTER}>Зарегистрироваться</NavLink>
                        </div>
                    </div>
                    :
                    <div>
                        <button onClick={clickAuth} className={s.button}>Зарегистрироваться</button>
                        <div className={s.footerBlock}>
                            <span className={s.textFooter}>Есть аккаунт?</span>
                            <NavLink className={s.linkFooter} to={LOGIN_ROUTER}>Войти</NavLink>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default AuthPage;