import React from 'react'
import SocialLogin from 'react-social-login'
import { Button } from 'semantic-ui-react'


const SocialButton = ({ children, triggerLogin, ...props }) => (
  <Button fluid onClick={triggerLogin} {...props}>
      { children }
  </Button>

)

export default SocialLogin(SocialButton)
