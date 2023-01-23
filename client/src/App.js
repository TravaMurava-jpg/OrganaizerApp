import './App.scss';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';
import { useRoutes } from './routes';
import { AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/auth.hook';

function App() {
  const {login, logout, token, userId, isReady} = useAuth()
  console.log(token)
  const isLogin = !!token
  const routes = useRoutes(isLogin);
  console.log(isLogin)
  

  return (
    <AuthContext.Provider value={{login, logout, token, userId, isReady, isLogin}}>
    <div className="app">
      <Router>
     <Navbar />
      {routes}  
     </Router> 
    </div>
    </AuthContext.Provider>
  );
}

export default App;
