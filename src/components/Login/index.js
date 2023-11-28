import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import ThemeContext from '../../context/ThemeContext'
import {
  LoginContainer,
  LoginCardContainer,
  WebsiteLogo,
  Label,
  LoginInput,
  Form,
  ShowPasswordLabel,
  LoginButton,
  ErrorMsg,
} from './styledComponents'

class Login extends Component {
  state = {
    username: '',
    password: '',
    passwordType: 'password',
    errorMsg: '',
    isError: false,
  }

  onSubmitSuccess = jwtToken => {
    // console.log(this.props)
    const {history} = this.props
    // console.log(history)
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
    this.setState({isError: false})
  }

  onSubmitFailure = errorMsg => {
    this.setState({errorMsg, isError: true})
  }

  onSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onCheckbox = event => {
    this.setState({passwordType: event.target.checked ? 'text' : 'password'})
  }

  updateUsername = event => {
    this.setState({username: event.target.value})
  }

  updatePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, passwordType, isError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value

          const websiteLogo = isDarkTheme
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

          const theme = isDarkTheme ? 'dark' : 'light'

          return (
            <LoginContainer theme={theme}>
              <LoginCardContainer theme={theme}>
                <WebsiteLogo src={websiteLogo} alt="website logo" />
                <Form onSubmit={this.onSubmit}>
                  <Label htmlFor="username">USERNAME</Label>
                  <LoginInput
                    type="text"
                    id="username"
                    placeholder="Username"
                    theme={theme}
                    value={username}
                    onChange={this.updateUsername}
                  />
                  <Label htmlFor="password">PASSWORD</Label>
                  <LoginInput
                    type={passwordType}
                    id="password"
                    placeholder="Password"
                    value={password}
                    theme={theme}
                    onChange={this.updatePassword}
                  />
                  <input
                    type="checkbox"
                    id="showPassword"
                    onClick={this.onCheckbox}
                  />
                  <ShowPasswordLabel htmlFor="showPassword" theme={theme}>
                    Show Password
                  </ShowPasswordLabel>
                  <div>
                    <LoginButton type="submit">Login</LoginButton>
                  </div>
                  <ErrorMsg>{isError && `* ${errorMsg}`}</ErrorMsg>
                </Form>
              </LoginCardContainer>
            </LoginContainer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Login
