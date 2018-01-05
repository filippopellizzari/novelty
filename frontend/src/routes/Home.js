import React from 'react';

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
                <form class="form-inline">
                  <div className="container" style={{textAlign:'center'}}>
                    <a className="btn btn-primary btn-lg"
                      href="/login">Login</a>
                    <a className="btn btn-secondary btn-lg"
                        href="/signup">Signup</a>
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
