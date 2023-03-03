import { signInWithEmailAndPassword } from 'firebase/auth'
import { useRef, useState } from 'react';
import { Button, Card, Form, Stack } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { auth } from '../../firebase';

export function LogIn() {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        try {
            setLoading(true);
            await signInWithEmailAndPassword(auth, emailRef.current!.value, passwordRef.current!.value)
            navigate('/feed');
        }
        catch (error: any) {
            toast(error.code, { type: 'error' });
            console.log(error);
        }
        setLoading(false);
    }
    return (
        <Card className='bg-light p-4' style={{ width: '500px' }}>
            <Card.Title>
                <h3 className='text-center'>Log in</h3>
            </Card.Title>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Stack gap={3}>
                        <Form.Group className='form-floating' controlId='name'>
                            <Form.Control type='email' placeholder=' ' required
                                ref={emailRef}
                            />
                            <Form.Label>Email...</Form.Label>
                        </Form.Group>
                        <Form.Group className='form-floating' controlId='password'>
                            <Form.Control type='password' placeholder=' ' required
                                ref={passwordRef}
                            />
                            <Form.Label>Password...</Form.Label>
                        </Form.Group>
                        <Button type='submit' disabled={loading}>Log in</Button>
                    </Stack>
                </Form>
            </Card.Body>
            <Card.Footer className='bg-light'>
                <span>Not have an account? </span>
                <Link to='/'>Sign up</Link>
            </Card.Footer>
        </Card>
    )
}
