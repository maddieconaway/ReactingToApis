
import React from 'react';
import './App.css';
import './images/logo.png'

require('es6-promise').polyfill();
require('isomorphic-fetch');

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      people: [],
      loadMovies: false,
      loadPeople: false
    };
  }

  componentDidMount() {
    fetch('https://ghibliapi.herokuapp.com/films')
      .then(response => { return response.json(); })
      .then(movies => {
        this.setState({ movies: movies });
      });

    fetch('https://ghibliapi.herokuapp.com/people')
      .then(response => { return response.json(); })
      .then(people => {
        this.setState({ people: people });
      });
  }

  getMovieComponent(e) {
    return (
      <div className='card' key={e.id}>
        <div className='title'>{e.title} ({e.release_date})</div>
        <div className='description'>{e.description}</div>
        <div className='director'>Director: {e.director}</div>
        <div className='producer'>Producer: {e.producer}</div>
      </div>
    );
  }

  getPeopleComponent(e) {
     
    return (
      <div className='personcard' key={e.id}>
        <div className='person'>Name: {e.name} Gender: {e.gender} Age: {e.age}   <a href={e.url} target='_blank'>(link)</a></div>
      </div>
    )
  }

  clickEventFilms(e) {
    this.setState({ loadMovies: !this.state.loadMovies });
    if(!this.state.loadMovies) {
      this.setState({ loadPeople: false });  
    }
  }

  clickEventPeople(e) {
    this.setState({ loadPeople: !this.state.loadPeople });
    if (!this.state.loadPeople) {
      this.setState({ loadMovies: false });
    }
  }

  getHeader() {
    return (
      <React.Fragment>
        <div className='header'>
          <img alt='logo' className='imgLogo' src={require('./images/logo.png')} />
          <button className='btnMovie' onClick={e => this.clickEventFilms(e)}>Load Films</button>
          <button className='btnPeople' onClick={e => this.clickEventPeople(e)}>Load People</button>
        </div>
      </React.Fragment>
    )
  }

  getMoviesOrPeople() {
    if (this.state.loadMovies) {
      return (
        <React.Fragment>
          <h1>Movies</h1>
          {this.state.movies.map(movie => this.getMovieComponent(movie))}
        </React.Fragment>
      );
    } else {
      if (this.state.loadPeople) {
        return (
          <React.Fragment>
            <h1>People</h1>
            {this.state.people.map(person => this.getPeopleComponent(person))}
          </React.Fragment>
        );
      } else { }
      if (!this.state.loadPeople && !this.state.loadMovies) {
        return;
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.getHeader()}
        {this.getMoviesOrPeople()}
      </React.Fragment>
    );
  }
}

export default App;

