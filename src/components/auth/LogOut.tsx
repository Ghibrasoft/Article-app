import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase'



export default function Logout() {
    const navigate = useNavigate();

    return (
        <div role='button' onClick={() => { signOut(auth); navigate('/') }}>
            Log out
        </div>
    )
}
