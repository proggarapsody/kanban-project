import React from 'react';
import Header from './components/Header/Header';
import MainPage from './pages/index';

function App() {
  return (
    <>
      <Header />
      <main className="App">
        <MainPage />
      </main>
    </>
  );
}

export default App;
