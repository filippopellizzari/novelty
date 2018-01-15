import React from 'react';
import {Row, Col} from 'react-bootstrap'

import RecList from '../components/survey/RecList'
import Questions from '../components/survey/Questions'
import recsA from '../data/recsA.json'
import recsB from '../data/recsB.json'
import survey from '../data/survey_between.json'

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
