import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import Moment from 'react-moment';
import { useParams } from 'react-router-dom'
import { auth, db } from '../../firebase';
import { CommentArticle } from '../CommentArticle';
import { DeleteArticle } from '../DeleteArticle';
import { LikeArticle } from '../LikeArticle';




export function SingleArticle() {
    const [user] = useAuthState(auth);
    const { id } = useParams();
    const [singleArticle, setSingleArticle] = useState<any>();

    useEffect(() => {
        const docRef = doc(db, 'Article', `${id}`);
        onSnapshot(docRef, (snapshot) => {
            setSingleArticle({ ...snapshot.data(), id: snapshot.id });
        });
    }, [id]);

    return (
        <Container>
            <div className='d-flex flex-column justify-content-center align-items-center'>
                {
                    singleArticle && (
                        <Card className='mt-3 p-3 bg-light' style={{ width: '70%' }}>
                            <Row className='g-0'>

                                {/* image column */}
                                <Col className='col-12 col-sm-12 col-md-6 col-lg-4'>
                                    <Card.Img alt={singleArticle.title} src={singleArticle.imageUrl}
                                        className='image-fluid'
                                        style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                                    />
                                </Col>

                                {/* another text info column */}
                                <Col className='col-12 col-sm-12 col-md-6 col-lg-8'>
                                    <Card.Body style={{ position: 'relative', height: '100%' }}>
                                        <Row className='mb-3'>
                                            <Col className='col-12'>

                                                {/* displaying who created article with custom badge */}
                                                <div>
                                                    <small className='text-muted'>Post created by </small>
                                                    <span className={`badge ${user?.uid === singleArticle.userId ?
                                                        'text-bg-primary'
                                                        :
                                                        'text-bg-secondary'}`}>
                                                        {user?.uid === singleArticle.userId ? (
                                                            <span>you</span>
                                                        ) : (
                                                            <span>{singleArticle.createdBy}</span>
                                                        )}
                                                    </span>
                                                </div>
                                            </Col>

                                            {/* displaying delete icon if article uploaded by current user */}
                                            <Col className='col-12'>
                                                {user && user.uid === singleArticle.userId && (
                                                    <DeleteArticle id={`${id}`} imageUrl={singleArticle.imageUrl} />
                                                )}
                                            </Col>
                                        </Row>
                                        {/* displaying date of article creation */}
                                        <Card.Text
                                            style={{ position: 'absolute', bottom: 0, right: 0 }}>
                                            <small className='text-muted'>
                                                {'(' + singleArticle.createdAt.toDate().toDateString() + ')'}
                                                <Moment fromNow className='ms-2'>{singleArticle.createdAt.toDate()}</Moment>
                                            </small>
                                        </Card.Text>

                                        <Card.Title>{singleArticle.title}</Card.Title>
                                        <Card.Text>{singleArticle.description}</Card.Text>

                                        {/* displaying like button */}
                                        <div className='d-flex align-items-center justify-content-end mb-5'>
                                            {user && <LikeArticle id={`${id}`} likes={singleArticle.likes} />}
                                            <small className='ms-1 d-flex align-items-center'>
                                                Likes ({singleArticle.likes.length})
                                            </small>
                                            <div className='vr mx-2'></div>
                                            <small>
                                                Comments ({singleArticle.comments.length})
                                            </small>
                                        </div>
                                    </Card.Body>
                                </Col>
                            </Row>
                            <hr />
                            <CommentArticle id={singleArticle.id} />
                        </Card>
                    )
                }
            </div>
        </Container >
    )
}
