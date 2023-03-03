import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useState } from 'react';
import { Button } from 'react-bootstrap'
import { FcGoogle } from 'react-icons/fc'
import { auth } from '../../firebase';

export function GoogleLogin() {
  const [loading, setLoading] = useState(false);
  const provider = new GoogleAuthProvider();

  function signInWithGoogle() {
    signInWithPopup(auth, provider)
      .then(() => {
        setLoading(true);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      })
  }
  return (
    <Button
      disabled={loading}
      variant='outline-primary'
      style={{
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50
      }}
      onClick={signInWithGoogle}
    >
      <FcGoogle />
    </Button>
  )
}
