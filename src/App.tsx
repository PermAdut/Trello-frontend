import { Route, Routes } from 'react-router'
import MainPage from './pages/MainPage/MainPage'
import Page404 from './pages/Page404/Page404'
import LoginPage from './pages/LoginPage/LoginPage'
import SingUpPage from './pages/SignUpPage/SignUpPage'
import { themeClass } from './styles/theme.css'

function App() {
  return (
    <div className={themeClass}>
      <Routes>
        <Route element={<MainPage />} path="/" />
        <Route element={<Page404 />} path="*" />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<SingUpPage />} path="/signup" />
      </Routes>
    </div>
  )
}

export default App
