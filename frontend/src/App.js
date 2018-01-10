import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './routes/Home';
import Login from './routes/Login';
import Signup from './routes/Signup';
import Welcome from './routes/Welcome';
import Catalogue from './routes/Catalogue';
import Survey from './routes/Survey';
import Thanks from './routes/Thanks';
import Navbar from './components/Navbar';

const App = () => (
    <BrowserRouter>
        <div>
            <Navbar />
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/welcome" component={Welcome} />
            <Route path="/catalogue" component={Catalogue} />
            <Route path="/survey" component={Survey} />
            <Route path="/thanks" component={Thanks} />
        </div>
    </BrowserRouter>
  )

export default App;
