import React, {Component} from 'react';
import '../css/App.css';


import ListArticle from './ListArticle';

class App extends Component {

  constructor(){
    super();

    this.state = {
      articleData: [],
      articleTitle: '',
      allSentences: null
    };
  }

  componentDidMount(){
    fetch('./preserverance_data.json')
      .then(response => response.json())
      .then(result => {
        const rawData = result.results.map( item => {return item;})

        this.setState({
          articleData: rawData,
          articleTitle: result.title

        });
      });
  }

  render() {
    return (
      <div className="App container">
       <div className="container article">
          <h3>{this.state.articleTitle}</h3>
           <ListArticle 
              sentences={this.state.articleData}
              />
        </div>
       
      </div>
    );
  }
}

export default App;
