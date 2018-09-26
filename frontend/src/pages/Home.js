import React from 'react';
import {Button} from 'semantic-ui-react'

class Home extends React.Component {


  componentDidMount() {
    localStorage.setItem("survey_id",this.props.match.params.survey_id)
    var crowd = this.props.match.params.crowd==='1' ? true : false
    localStorage.setItem("crowdsourcing",crowd)
    var diag = this.props.match.params.diag==='d' ? true : false
    localStorage.setItem("diagnostics",diag)
  }

  render() {
    return (
      <div>
        <div>
            <div className="jumbotron jumbotron-fluid">
              <div className="container" style={{textAlign:'center'}}>
                <h2 className="display-3">Novelty Survey</h2>
                <form className="form-inline">
                  <div className="container" style={{textAlign:'center',marginTop:20}}>
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
