import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageUrlForm from './components/ImageUrlForm/ImageUrlForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import Register from './components/Register/Register';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Signin from './components/Signin/Signin';
import './App.css';

const app = new Clarifai.App({
 apiKey: 'dfd551a192774652a27b307d140a8ded'
});

const particlesOptions = {
    particles: {
      number: {
        value: 100,
        density: {
          enable: true,
          value_area: 800
        }
      }
    }
  }

class App extends Component {

  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }

  calculateFaceLocation = (data) => {
    const face = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height);

    return {
      leftCol: face.left_col * width,
      topRow: face.top_row * height,
      rightCol: width - (face.right_col * width),
      bottomRow: height - (face.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box})
    console.log(this.state)
  }

  onInputChange = (event) => {
    this.setState({
      input: event.target.value
    })
  }

  onSubmit = () => {
    this.setState ({
          imageUrl: this.state.input
        })
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then( response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err))
  }

  onRouteChange = (route) => {
    if(route === 'signout') {
      this.setState({isSignedIn: false})
    } else if(route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    return (
      <div className="App">
        <Particles className = 'particles'
              params={particlesOptions}
            />
        <Navigation isSignedIn = {this.state.isSignedIn} onRouteChange = {this.onRouteChange}/>

        { this.state.route === 'home' ?
            <div>
                  
                    <Logo />
                    <Rank />
                    <ImageUrlForm onInputChange = {this.onInputChange} onSubmit = {this.onSubmit}/>
                    <FaceRecognition box = {this.state.box} imageUrl = {this.state.imageUrl}/>
                  </div>
                  : (
                      this.state.route === 'signin' ?
                      <Signin onRouteChange = {this.onRouteChange}/>
                   :
                    <Register onRouteChange = {this.onRouteChange}/>
                    )
        }
      </div>
    );
  }
}

export default App;
