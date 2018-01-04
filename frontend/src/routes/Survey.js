import React from 'react';
import RecList from '../components/RecList'
import Questions from '../components/Questions'
import {Row, Col} from 'react-bootstrap'
import recsA from '../recsA.json'
import recsB from '../recsB.json'
import survey from '../survey_between.json'

class Survey extends React.Component {
  render() {
    return (
      <div className="container">
        <Row>
          <Col xs={12} md={7} style={{marginTop:30}}>
            <RecList recs={recsA} name="A"/>
            <RecList recs={recsB} name="B"/>
          </Col>
          <Col xs={6} md={4} style={{marginLeft:50, marginTop:60}}>
            <Questions questions={survey.questions}/>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Survey;
