import { Container, Nav, Navbar as NavbarBs } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { Avatar } from './auth/Avatar';
import { RiArticleLine } from 'react-icons/ri'
import { Link } from 'react-router-dom';


export function Navbar() {
    const [user] = useAuthState(auth);
    return (
        <NavbarBs sticky='top' className='bg-white shadow-sm mb-3'>
            <Container>
                <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h1 className='d-flex justify-content-center align-items-center'>
                        <RiArticleLine className='text-primary' />
                        Articles
                    </h1>
                </Link>
                <Nav className='ms-auto'>
                    {user && <Avatar />}
                </Nav>
            </Container>
        </NavbarBs>
    )
}
