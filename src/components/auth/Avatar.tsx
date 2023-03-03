import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import Logout from './LogOut';

export function Avatar() {
    const [user] = useAuthState(auth);

    return (
        <div className="dropdown">
            <div className="dropdown-toggle" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                <img alt='avatar'
                    className='rounded-circle' height={30} width={30}
                    src={
                        user && auth.currentUser!.photoURL ?
                            `${auth.currentUser?.photoURL}`
                            :
                            '/images/avatar.jpeg'
                    }
                />
            </div>

            <ul className="dropdown-menu dropdown-menu-end p-3" aria-labelledby="dropdownMenuLink">
                <li><Logout /></li>
            </ul>
        </div>
    )
}
