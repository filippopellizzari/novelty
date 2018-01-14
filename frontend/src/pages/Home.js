import React from 'react';
import {Button} from 'semantic-ui-react'

class Home extends React.Component {

  render() {
    return (
      <div>
        <div>
            <div className="jumbotron jumbotron-fluid">
              <div className="container" style={{textAlign:'center'}}>
                <h2 className="display-3">Novelty Survey</h2>
                <p className="lead">Online study on how the user perceives
                  novelty in recommender systems</p>
                <form className="form-inline">
                  <div className="container" style={{textAlign:'center'}}>
                    <Button primary size="large"  href="/login">Login</Button>
                    <Button color="grey" size="large"href="/signup">Signup</Button>
                  </div>
                </form>
              </div>
            </div>
        </div>
      </div>
    );
  }
}

export default Home;
