import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import RouteAccountProvider from './pages/account/RouteAccountProvider';
import RouteChatProvider from './pages/chat/RouteChatProvider';
import RouteHomeProvider from './pages/home/RouteHomeProvider';
import RouteLoginProvider from './pages/login/RouteLoginProvider';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/">
          <Route index element={<RouteHomeProvider />} />
          <Route path="login" element={<RouteLoginProvider />} />
          <Route path="account" element={<RouteAccountProvider />} />
          <Route path="chat" element={<RouteChatProvider />} />
        </Route>
        <Route path="*" element={<div>404: Page not found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
