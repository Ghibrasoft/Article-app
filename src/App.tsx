import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import Feed from "./components/pages/Feed";
import { Navbar } from './components/Navbar';
import { SignUp } from "./components/auth/SignUp";
import { auth } from "./firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import { LogIn } from "./components/auth/LogIn";
import { SingleArticle } from "./components/pages/SingleArticle";


function App() {
  const [user] = useAuthState(auth);
  return (
    <>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={
            user ?
              <Feed />
              :
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <SignUp />
              </div>
          } />
          <Route path="/login" element={
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <LogIn />
            </div>
          } />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/singlearticle/:id" element={<SingleArticle />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;

