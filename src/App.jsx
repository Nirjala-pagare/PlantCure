import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Diagnose from './pages/Diagnose';
import Result from './pages/Result';
import About from './pages/About';
import DiseaseLibrary from './pages/DiseaseLibrary';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/diagnose" element={<Diagnose />} />
            <Route path="/result" element={<Result />} />
            <Route path="/about" element={<About />} />
            <Route path="/disease-library" element={<DiseaseLibrary />} />
            <Route path="/disease-library/:id" element={<DiseaseLibrary />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

