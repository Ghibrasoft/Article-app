import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react'
import { Alert, Button, Card, Form, Stack } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth } from '../../firebase';
import { GithubLogin } from './GithubLogin';
import { GoogleLogin } from './GoogleLogin';



export function SignUp() {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    confPassword: ''
  });
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confPasswordRef = useRef<HTMLInputElement>(null);


  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (passwordRef.current!.value !== confPasswordRef.current!.value) {
      return setError("Passwords don't match");
    }

    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, emailRef.current!.value, passwordRef.current!.value)
      toast("You successfully created account", {type: 'success'});
      navigate('/feed');
    }
    catch (error: any) {
      toast(error.code, { type: 'error' });
      console.log(error);
      setError("Failed to create an account");
    }
    setLoading(false);
  }


  return (
    <Card className='bg-light p-4' style={{ width: '500px' }}>

      {/* card title */}
      <Card.Title>
        <h3 className='text-center'>Sign up</h3>
        <small>{error && <Alert variant='danger'>{error}</Alert>}</small>
      </Card.Title>

      {/* card body, form */}
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Stack gap={3}>

            <Form.Group className='form-floating' controlId='name'>
              <Form.Control type='text' placeholder=' ' required
                ref={nameRef}
                onChange={() => { setUserData({ ...userData, name: nameRef.current!.value }) }}
              />
              <Form.Label>Name...</Form.Label>
            </Form.Group>

            <Form.Group className='form-floating' controlId='email'>
              <Form.Control type='email' placeholder=' ' required
                ref={emailRef}
                onChange={() => { setUserData({ ...userData, email: emailRef.current!.value }) }}
              />
              <Form.Label>Email...</Form.Label>
            </Form.Group>

            <Form.Group className='form-floating' controlId='password'>
              <Form.Control type='password' placeholder=' ' autoComplete='on' required
                ref={passwordRef}
                onChange={() => { setUserData({ ...userData, password: passwordRef.current!.value }) }}
              />
              <Form.Label>Password...</Form.Label>
            </Form.Group>

            <Form.Group className='form-floating' controlId='confPassword'>
              <Form.Control type='password' placeholder=' ' autoComplete='on' required
                ref={confPasswordRef}
              />
              <Form.Label>Confirm password...</Form.Label>
            </Form.Group>

            <Button type='submit' disabled={loading}>Sign up</Button>
          </Stack>

        </Form>
      </Card.Body>

      {/* card footer */}
      <Card.Footer className='bg-light'>
        <span>Already have an account? </span>
        <Link to='/login'>Log in</Link>

        {/* log in with different accounts */}
        <div className='mt-3'>
          <h5 className='text-center'>Log in with different accounts</h5>
          <Stack direction='horizontal' gap={3} className='d-flex justify-content-center'>
            <GoogleLogin />
            <GithubLogin />
          </Stack>
        </div>
      </Card.Footer>

    </Card>
  )
}
