import {Component} from 'react'
import Header from '../Header'
import ThemeContext from '../../context/ThemeContext'
import {HomeMainContainer} from './styledComponents'

class Home extends Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const theme = isDarkTheme ? 'dark' : 'light'
          const color = isDarkTheme ? '#f9f9f9' : '#181818'
          return (
            <HomeMainContainer theme={theme}>
              <Header />
            </HomeMainContainer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Home
