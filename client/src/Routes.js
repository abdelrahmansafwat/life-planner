import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from "./Login";
import Register from "./Register";
import CreateSchedule from "./CreateSchedule";
import Schedule from "./Schedule";
import history from './history';


export default class Routes extends Component {
    render() {
        return (
            <BrowserRouter history={history}>
                <Switch>
                    <Route path="/" exact component={Login} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/create-schedule" component={CreateSchedule} />
                    <Route path="/schedule" component={Schedule} />
                </Switch>
            </BrowserRouter>
        )
    }
}