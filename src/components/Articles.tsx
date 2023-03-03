import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react'
import { Alert, Card, Col, Row } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { auth, db } from '../firebase';
import { DeleteArticle } from './DeleteArticle';
import { FindArticle } from './FindArticle';
import { LikeArticle } from './LikeArticle';


export function Articles() {
    const [user] = useAuthState(auth);
    const [articles, setArticles] = useState<any[]>([]);
    const [word, setWord] = useState('');

    useEffect(() => {
        const articleRef = collection(db, 'Article');
        const q = query(articleRef, orderBy('createdAt', 'desc'));

        onSnapshot(q, (snapshot) => {
            const articles = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setArticles(articles);
        });
    }, []);


    return (
        <div>

            {/* show search bar when articles are shown */}
            {
                articles.length > 0 &&
                <div>
                    <FindArticle setWord={setWord} />
                </div>
            }

            {/* article counter */}
            <h4 className='my-2'>{`Total articles (${articles.length})`}</h4>

            {/* displaying article's list if exists */}
            {
                articles.length === 0 ? (
                    <Alert>No articles yet...</Alert>
                ) : (
                    articles.filter(({ title, description }) =>
                        title.toLocaleLowerCase().includes(word) || description.toLocaleLowerCase().includes(word))
                        .map(({ id, title, description, imageUrl, createdAt, userId, createdBy, likes, comments }) => (
                            <Card key={id} className='mt-3 p-3 bg-light'>
                                <Row className='g-0'>

                                    {/* image column */}
                                    <Col className='col-12 col-md-6 col-lg-4'>
                                        <Link to={`/singlearticle/${id}`}>
                                            <Card.Img src={imageUrl}
                                                className='image-fluid'
                                                style={{ width: '200px', height: '200px', objectFit: 'cover', cursor: 'pointer' }} />
                                        </Link>
                                    </Col>

                                    {/* another text info column */}
                                    <Col className='col-12 col-md-6 col-lg-8'>
                                        <Card.Body style={{ position: 'relative', height: '100%' }}>
                                            <Row className='mb-3'>
                                                <Col className='col-6'>

                                                    {/* displaying who created article with custom badge */}
                                                    {
                                                        createdBy && (
                                                            <div>
                                                                <small className='text-muted'>Uploaded by </small>
                                                                <span className={`badge ${user?.uid === userId ?
                                                                    'text-bg-primary'
                                                                    :
                                                                    'text-bg-secondary'}`}>
                                                                    {user?.uid === userId ? (
                                                                        <span>you</span>
                                                                    ) : (
                                                                        <span>{createdBy}</span>
                                                                    )}
                                                                </span>
                                                            </div>
                                                        )
                                                    }
                                                </Col>

                                                {/* displaying delete icon if article uploaded by current user */}
                                                <Col className='col-6'>
                                                    {user && user.uid === userId && (
                                                        <DeleteArticle id={id} imageUrl={imageUrl} />
                                                    )}
                                                </Col>
                                            </Row>
                                            <Card.Title>{title}</Card.Title>
                                            <Card.Text>{description}</Card.Text>

                                            {/* displaying like button */}
                                            <div className='d-flex align-items-center justify-content-end mb-5'>
                                                {user && <LikeArticle id={id} likes={likes} />}
                                                <small className='ms-1 d-flex align-items-center'>
                                                    Likes ({likes.length})
                                                    <div className='vr mx-2'></div>
                                                    Comments ({comments.length})
                                                </small>
                                            </div>
                                            {/* displaying date of article creation */}
                                            <Card.Text
                                                style={{ position: 'absolute', bottom: 0, right: 0 }}>
                                                <small className='text-muted'>
                                                    {'(' + createdAt.toDate().toDateString() + ')'}
                                                    <Moment fromNow className='ms-2'>{createdAt.toDate()}</Moment>
                                                </small>
                                            </Card.Text>
                                        </Card.Body>
                                    </Col>
                                </Row>
                            </Card>
                        ))
                )
            }
        </div>
    )
}