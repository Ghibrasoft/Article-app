import { GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { useState } from 'react';
import { Button } from 'react-bootstrap'
import { VscGithub } from 'react-icons/vsc'
import { auth } from '../../firebase';


export function GithubLogin() {
    const [loading, setLoading] = useState(false);
    const provider = new GithubAuthProvider();

    function signInWithGithub() {
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
        <Button variant='outline-dark'
            disabled={loading}
            style={{
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 50,
                height: 50
            }}
            onClick={signInWithGithub}
        >
            <VscGithub />
        </Button>
    )
}
