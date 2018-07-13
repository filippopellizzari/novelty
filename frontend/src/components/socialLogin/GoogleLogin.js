import React from 'react'
import { Icon } from 'semantic-ui-react'

import SocialButton from '../SocialButton';


class GoogleLogin extends React.Component{

  handleSocialLogin = (res) => {
    var data = {}
    data.email = res._profile.email;
    data.password = "gooPassword";
    data.accessToken = res._token.accessToken
    this.props.socialSubmit(data)
  }

  handleSocialLoginFailure = (err) => {
    console.error(err)
  }

  render(){
    return (
          <SocialButton
            color='google plus'
            provider='google'
            appId='343367764215-q26jog9e7ubf2gn5lgc3c3ei2dilm3kt.apps.googleusercontent.com'
            onLoginSuccess={this.handleSocialLogin}
            onLoginFailure={this.handleSocialLoginFailure}
          >
          <Icon name='google plus'/>
          Login with Google
          </SocialButton>

    );
  }

}

export default GoogleLogin;
