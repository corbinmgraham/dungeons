
import React, { useDebugValue, useEffect, useState } from "react"
import './styles/App.css'

import {
    BrowserRouter as Router,
    Routes,
    Routes as Switch,
    Link,
    useHistory, Route
} from "react-router-dom";
import Home from "./Home";
//import SignUpUser from './SignUp'
// import Routines from './Routines'
// import Activities from './Activities'
// import MyRoutines from "./MyRoutines.js";
// import SignUp from "./SignUpUser";
// import LogIn from "./LogInUser"
import Navbar from "./Navbar";
import ActionBar from "./ActionBar";
import LeftMenu from "./LeftMenu";
const App = () => {
    const [token, setToken] = useState("")

    useEffect(() => {
        setToken(!!localStorage.getItem("token"));
    }, []);
    return (
<div className="app_wrap">
        <Router>
            <Navbar />
            <LeftMenu/>

            <Switch >
                {/* {token ? null
                    : (<Route exact path="/" element={<SignUp token={token} setToken={setToken} />} />)
                } */}

                {/* <Route path="/routines" element={<Routines token={token} setToken={setToken} />} />
                <Route path="/myroutines" element={< MyRoutines token={token} setToken={setToken} />} />



                <Route path="/activities" element={<Activities />}></Route>
                
                <Route path="/LogInUser" element={<LogIn />} />
                <Route path="/SignUpUser" element={<SignUp />} /> */}
                {/* <Route path="/" element={<Home />} /> */}
            </Switch>
        {/* make switch case for if user hasnt input story*/}
            <Home/>
            <ActionBar/>
        </Router >
        </div>

    )
}
export default App;