import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import HomePage from './pages/HomePage/HomePage';
import Navbar from './components/Navbar/Navbar';
import CountryPage from './pages/CountryPage/CountryPage';

const queryClient = new QueryClient();

function App() {
  return (
    <main>
    <QueryClientProvider client={queryClient}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/country/:countryCode" element={<CountryPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
    </main>
  );
}

export default App;
