import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import AtmsForm from './AtmsForm';
import UseAsyncHook from './UseAsyncHook';
import ShowAtms from './ShowAtms';
import './App.css';

function App() {
  const [request, setRequest] = useState(null);
  const [result, loading, error] = UseAsyncHook(request);

  const onAtmsSubmit = (request) => {
    setRequest(request);
  }

  const resetSearch = () => {
    setRequest(null);
  }

  return (
    <div className="App container-fluid">
      <header className="App-header pt-md-1">
        <h1>Encuentra tu cajero</h1>
        <p>Buenos Aires</p>
      </header>
      <div className="container">
        {(!request) ?
          <AtmsForm onAtmsSubmit={onAtmsSubmit}/>
        : loading && result.length === 0 ?
        <Spinner variant="info" animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner> 
        : <ShowAtms results={result} error={error} request={request} resetSearch={resetSearch}/>
        }
      </div>
    </div>
  );
}

export default App;
