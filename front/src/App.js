import React from 'react';
import API from './utils/api';
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
//import List from './viwers/list';
import SingleView from './viwers/singleView';
import MyNavbar from './components/navbar';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";

class App extends React.Component {
    constructor (props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            isLoading: true,
            data: [],
            query: '',
            hasError: false,
        }
    }
    componentDidMount () {
        this.loadData();
    }
    handleChange(value) {
        this.setState({query: value});
        this.loadData();
    }
    handleError (errorHeader, error) {
        this.setState({
            hasError: true,
            errorHeader,
            error
        });

    }
    loadData = () => {
        API.get("/search/photos", {params: {query: this.state.query}})
            .then(result => {
                clearInterval(this.timer);
                this.timer = null;
                let images = [];
                for (let el of result.data.results) {
                    let data = {
                        src: el.urls.small,
                        date: el.created_at,
                    }
                    images.push(data);
                }
                this.timer = setInterval(() => {
                    this.setState({
                        isLoading: false,
                        data: images,
                    });
                }, 500);
            })
            .catch(error => {
                console.log("Error: " + error);
            });
    }
    render () {
        if (this.state.hasError) {
            return <Redirect to="/error" />
        }
        let body;
        if (!this.state.data.length) {
            if (this.state.isLoading) {
                body = "Loading...";
            } else {
                body = "Nothing found";
            }
        } else {
            const response = this.state.data.find(e => !!e);
            body = <SingleView src={response.src} date={response.date} />;
        }
        return ( 
            <Router>
                <div className="App">
                    <MyNavbar getText={this.handleChange} />
                    {body}
                </div>
            </Router>
        );
    }
}

export default App;