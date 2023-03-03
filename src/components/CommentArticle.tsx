import { arrayRemove, arrayUnion, doc, onSnapshot, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row, Stack } from 'react-bootstrap'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../firebase'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { v4 as uuidv4 } from 'uuid'
import Moment from 'react-moment'


type commentArticleType = {
    id: string | undefined;
}
export function CommentArticle({ id }: commentArticleType) {
    const [currentlyLogedInUser] = useAuthState(auth);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState<any[]>();
    const commentsRef = doc(db, 'Article', `${id}`);


    useEffect(() => {
        const docRef = doc(db, 'Article', `${id}`);

        onSnapshot(docRef, (snapshot) => {
            setComments(snapshot.data()?.comments);
        })
    }, [id]);


    function handleDeleteComment(comment: any) {
        updateDoc(commentsRef, {
            comments: arrayRemove(comment)
        }).then((e) => {
            console.log(e);
        }).catch((error) => {
            console.log(error);
        })
    }

    function submitHandler(e: React.FormEvent) {
        e.preventDefault();
        
        updateDoc(commentsRef, {
            comments: arrayUnion({
                user: currentlyLogedInUser?.uid,
                userName: currentlyLogedInUser?.displayName ?
                    currentlyLogedInUser?.displayName
                    :
                    currentlyLogedInUser?.email?.split('@')[0],
                comment: comment,
                createdAt: new Date(),
                commentId: uuidv4()
            })
        }).then(() => {
            setComment('');
        })
    }

    return (
        <Container>

            {/* write comment input */}
            <div>
                <Form onSubmit={submitHandler}>
                    <Stack direction='horizontal' gap={2}>
                        <Form.Group controlId='comment' className='form-floating'>
                            <Form.Control type='text' name='comment' placeholder=' ' required
                                value={comment}
                                onChange={(e) => { setComment(e.target.value) }}
                            />
                            <Form.Label>Write a comment...</Form.Label>
                        </Form.Group>
                        <Button variant='primary' type='submit'>Post</Button>
                    </Stack>
                </Form>
            </div>

            {/* displaying comments */}
            <div className='position-relative'>
                {
                    comments !== null &&
                    comments?.map(
                        ({ user, userName, comment, commentId, createdAt }) =>
                            <div key={commentId} className='px-3 mt-3 shadow-sm'>
                                <Row>
                                    <Col className='col-11'>
                                        <div>
                                            <div className='d-flex flex-column align-items-start'>
                                                <span
                                                    className={`badge ${user === currentlyLogedInUser?.uid ? 'bg-success' : 'bg-secondary'}`}
                                                >
                                                    {userName}
                                                </span>

                                                <small className='text-muted'>
                                                    <Moment fromNow>{createdAt.toDate()}</Moment>
                                                    {' (' + createdAt.toDate().toDateString() + ')'}
                                                </small>
                                            </div>
                                            <p className='mt-2'>{comment}</p>
                                        </div>
                                    </Col>
                                    <Col className='col-1'>
                                        {
                                            user === currentlyLogedInUser?.uid && (
                                                <span
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => handleDeleteComment({ user, userName, comment, commentId, createdAt })}
                                                >
                                                    <RiDeleteBin5Line color='#dc3545' />
                                                </span>
                                            )
                                        }
                                        {/* <div
                                            style={{ position: 'absolute', bottom: 0, right: 0 }}>
                                            <small className='text-muted'>
                                                {'(' + createdAt.toDate().toDateString() + ')'}
                                                <Moment fromNow className='ms-2'>{createdAt.toDate()}</Moment>
                                            </small>
                                        </div> */}
                                    </Col>
                                </Row>
                            </div>
                    )
                }
            </div>
        </Container>
    )
}
