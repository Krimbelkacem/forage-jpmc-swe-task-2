import React, { Component } from 'react';
import DataStreamer, { ServerRespond } from './DataStreamer';
import Graph from './Graph';
import './App.css';

/**
 * State declaration for <App />
 */
interface IState {
  data: ServerRespond[],
  showGraph: boolean;
}

/**
 * The parent element of the react app.
 * It renders title, button and Graph react element.
 */
class App extends Component<{}, IState> {
 
  constructor(props: {}) {
    super(props);
  
    this.state = {
      data: [],
      showGraph: false, 
    };
  }
  
  

  /**
   * Render Graph react component with state.data parse as property data
   */
  renderGraph() {
    if (this.state.showGraph) {
      return <Graph data={this.state.data} />;
    } else {
      return null; // Or any placeholder when graph is hidden
    }
  }
  

  /**
   * Get new data from server and update the state with the new data
   */
  // Method to fetch data continuously
  getDataFromServer() {
    // Start fetching data at regular intervals
    const intervalId = setInterval(() => {
      DataStreamer.getData((serverResponds: ServerRespond[]) => {
        // Update state with new data
        this.setState((prevState) => ({
          data: [...prevState.data, ...serverResponds],
          showGraph: true, // Set showGraph to true when data is received
        }));
      });
    }, 100); // Fetch data every 100 milliseconds

    // Optional: Set a guard value to stop the interval process
    // For example, stop fetching after a specific duration (e.g., 5000ms)
    setTimeout(() => {
      clearInterval(intervalId); // Stop fetching after 5000ms (adjust as needed)
    }, 5000);
  }

  /**
   * Render the App react component
   */
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Bank & Merge Co Task 2
        </header>
        <div className="App-content">
          <button className="btn btn-primary Stream-button"
            // when button is click, our react app tries to request
            // new data from the server.
            // As part of your task, update the getDataFromServer() function
            // to keep requesting the data every 100ms until the app is closed
            // or the server does not return anymore data.
            onClick={() => {this.getDataFromServer()}}>
            Start Streaming Data
          </button>
          <div className="Graph">
            {this.renderGraph()}
          </div>
        </div>
      </div>
    )
  }
}

export default App;
