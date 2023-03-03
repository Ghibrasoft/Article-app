import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import React, { useRef, useState } from 'react'
import { Form, Stack } from 'react-bootstrap'
import Button from 'react-bootstrap/esm/Button'
import { useAuthState } from 'react-firebase-hooks/auth'
import { toast } from 'react-toastify'
import { auth, db, storage } from '../firebase'



type formDataTypes = {
    title: string;
    description: string;
    imageUrl: any;
    createdAt: Date;
}

export function AddArticle() {
    const [user] = useAuthState(auth);
    const [formData, setFormData] = useState<formDataTypes>({
        title: '',
        description: '',
        imageUrl: '',
        createdAt: Timestamp.now().toDate()
    });
    const [progress, setProgress] = useState(0);
    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const imageRef = useRef<HTMLInputElement>(null);

    // form submit
    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const storageRef = ref(storage, `/images/${Date.now()}${formData.imageUrl.name}`);
        const uploadImg = uploadBytesResumable(storageRef, formData.imageUrl);

        uploadImg.on('state_changed', (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgress(progress);
        },
            (error) => {
                console.log(error);
            },
            () => {
                setFormData({
                    title: '',
                    description: '',
                    imageUrl: '',
                    createdAt: Timestamp.now().toDate()
                });

                getDownloadURL(uploadImg.snapshot.ref)
                    .then((url) => {
                        const articleRef = collection(db, 'Article');
                        addDoc(articleRef, {
                            title: formData.title,
                            description: formData.description,
                            imageUrl: url,
                            createdAt: Timestamp.now().toDate(),

                            createdBy: user?.displayName,
                            userId: user?.uid,
                            likes: [],
                            comments: []
                        })
                            .then(() => {
                                toast('Article added successfully', { type: 'success' });
                                setProgress(0);
                            })
                            .catch((error) => {
                                console.log(error);
                                toast('Error adding article', { type: 'error' });
                            })
                    })
            }
        )
    }

    return (
        <div className='border p-3 mt-3 bg-light position-fixed'>
            <Form onSubmit={handleSubmit}>
                <Stack gap={3}>

                    <Form.Group className='form-floating' controlId='title'>
                        <Form.Control type='text' name='title' placeholder=' ' required
                            ref={titleRef}
                            value={formData.title}
                            onChange={(e) => { setFormData({ ...formData, [e.target.name]: titleRef.current!.value }) }}
                        />
                        <Form.Label>Title...</Form.Label>
                    </Form.Group>

                    <Form.Group controlId='description'>
                        <Form.Label>Description...</Form.Label>
                        <Form.Control as='textarea' rows={5} name='description' style={{ resize: 'none' }} required
                            ref={descriptionRef}
                            value={formData.description}
                            onChange={(e) => { setFormData({ ...formData, [e.target.name]: descriptionRef.current!.value }) }}
                        />
                    </Form.Group>
                    
                    <Form.Group controlId=''>
                        <Form.Label>Image</Form.Label>
                        <Form.Control type='file' name='imageUrl' accept='image/*' required
                            ref={imageRef}
                            onChange={(e) => { setFormData({ ...formData, [e.target.name]: imageRef.current?.files?.[0] }) }}
                        />
                    </Form.Group>
                    {
                        progress === 0 ?
                            null
                            :
                            <div role='progressbar' className='progress progress-bar-striped progress-bar-animated' style={{ height: '20px', width: `${progress}%` }}>
                                <span className='d-flex justify-content-center align-items-center w-100'>
                                    {`Uploading ${progress}%`}
                                </span>
                            </div>
                    }


                    <Button type='submit'>Publish</Button>
                    <Button type='reset' variant='outline-danger'>Clear</Button>
                </Stack>
            </Form>
        </div>

    )
}