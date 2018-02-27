import React from 'react'
import { Icon } from 'semantic-ui-react'

import SocialButton from '../SocialButton';


class FacebookLogin extends React.Component{

  handleSocialLogin = (res) => {
    console.log(res);
    var data = {}
    data.email = res._profile.email;
    data.password = "fbPassword";
    data.accessToken = res._token.accessToken
    console.log(data)
    this.props.socialSubmit(data)
  }

  handleSocialLoginFailure = (err) => {
    console.error(err)
  }

  render(){
    return (
          <SocialButton
            color='facebook'
            provider='facebook'
            appId='1992158391108754'
            onLoginSuccess={this.handleSocialLogin}
            onLoginFailure={this.handleSocialLoginFailure}
          >
          <Icon name='facebook'/>
          Login with Facebook
          </SocialButton>

    );
  }

}

export default FacebookLogin;
