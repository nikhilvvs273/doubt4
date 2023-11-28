import {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import ActiveMenuContext from './context/ActiveMenuContext'
import ThemeContext from './context/ThemeContext'

const activeMenuConstants = {
  initial: 'INITIAL',
  home: 'HOME',
  trending: 'TRENDING',
  gaming: 'GAMING',
  savedVideos: 'SAVED_VIDEOS',
}

class App extends Component {
  state = {
    isDarkTheme: false,
    activeMenu: activeMenuConstants.initial,
  }

  changeTheme = () => {
    this.setState(prev => ({isDarkTheme: !prev.isDarkTheme}))
  }

  changeActiveMenu = value => {
    this.setState({activeMenu: value})
  }

  render() {
    const {isDarkTheme, activeMenu} = this.state

    return (
      <ThemeContext.Provider
        value={{isDarkTheme, changeTheme: this.changeTheme}}
      >
        <ActiveMenuContext.Provider
          value={{activeMenu, changeActiveMenu: this.changeActiveMenu}}
        >
          <Switch>
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/" component={Home} />
          </Switch>
        </ActiveMenuContext.Provider>
      </ThemeContext.Provider>
    )
  }
}

export default App
