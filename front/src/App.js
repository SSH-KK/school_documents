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
        API.get("/cards")
            .then(result => {
                // clearInterval(this.timer);
                // this.timer = null;
                
                let images = [];
                for (let el of result.data) {
                    let data = {
                        src: getimgName(el.image_url),
                        date: el.post_date,
                        class: el.class_num,
                        title: el.title,
                    }
                    images.push(data);
                }
                // this.timer = setInterval(() => {
                //     this.setState({
                //         isLoading: false,
                //         data: images,
                //     });
                // }, 500);
                this.setState({
                    isLoading: false,
                    data: images,
                });
            })
            .catch(error => {
                console.log("Error: " + error);
            });
    }
    render () {
        if (this.state.hasError) {
            return <Redirect to="/error" />
        }
        return ( 
            <Router>
                <div className="App">
                    <MyNavbar getText={this.handleChange} />

                    <Switch>
                        <Route path="/paper/:id" render={(props) => <SingleView data={this.state.data} {...props} />} />
                    </Switch>
                    {/* <Switch>
                        <Route path="/" render={ () => <List data={this.state.data} /> } />
                    </Switch> */}

                </div>
            </Router>
        );
    }
}

export default App;

function getimgName (str) {
    return str.slice(- (1+ str.lastIndexOf('/')));
}