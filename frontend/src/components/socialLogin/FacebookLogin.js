/*global FB*/

import React from 'react';
import { Button,Icon } from 'semantic-ui-react'
import PropTypes from "prop-types";

class FacebookLogin extends React.Component {

  constructor(){
    super();
    this.state = {
        email:"",
        gender:"",
        accessToken:""
    }

  }

  loadFbLoginApi() {

        window.fbAsyncInit = function() {
            FB.init({
                appId      : 1992158391108754,
                cookie     : true,  // enable cookies to allow the server to access
                // the session
                xfbml      : true,  // parse social plugins on this page
                version    : 'v2.5' // use version 2.1
            });
        };

        //console.log("Loading fb api");
          // Load the SDK asynchronously
        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
  }

  componentDidMount() {
        this.loadFbLoginApi();
    }

    testAPI(authResponse) {
      console.log('Welcome!  Fetching your information.... ');
      FB.api('/me', function(response) {
        console.log('Successful login for: ' + response.name);
      });
      FB.api('/'+authResponse.userID,'GET',{fields:'gender,email,age_range'},
        (res) => {
        console.log(res)
        var data = []
        data.email = res.email;
        data.gender = res.gender;
        data.accessToken = authResponse.accessToken
        this.props.socialSubmit(data)
        }
      );
    }

    statusChangeCallback(response) {
      console.log('statusChangeCallback');
      console.log(response);
      if (response.status === 'connected') {
        this.testAPI(response.authResponse);
      } else if (response.status === 'not_authorized') {
          console.log("Please log into this app.");
      } else {
          console.log("Please log into this facebook.");
      }
    }

    checkLoginState() {
      FB.getLoginStatus(function(response) {
        this.statusChangeCallback(response);
      }.bind(this));
    }

    handleFBLogin() {
        FB.login(this.checkLoginState());
    }

    render() {
        return (
                <div>
                    <Button
                      fluid
                      color="facebook"
                      onClick = {this.handleFBLogin.bind(this)}
                    >
                        <Icon name='facebook'/>
                        Login with Facebook
                    </Button>
                </div>
               );
    }
}

FacebookLogin.propTypes = {
  socialSubmit: PropTypes.func.isRequired
};

export default FacebookLogin;
