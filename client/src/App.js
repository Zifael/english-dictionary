import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import AppRouter from './components/AppRouter';
import {check} from './http/userApi'
import { setAuth } from './redux-store/auth-reducer';


function App() {


  const dispatch = useDispatch()
  const [loading,setLoading] = useState(true)

  useEffect(() => {
    check().then(data => {
      dispatch(setAuth(true))
    }).finally(() => setLoading(false))
  },[])

  if(loading) {
    return <h1>Загрузка</h1>
  }

  return (
    <div className="App">
      <AppRouter />      
    </div>
  );
}

export default App;
