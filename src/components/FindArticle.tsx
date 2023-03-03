import { Form } from 'react-bootstrap';


export function FindArticle({ setWord }: any) {
    return (
        <Form>
            <Form.Group className='form-floating'>
                <Form.Control className='' id='find-article' placeholder=' ' onChange={(e) => { setWord(e.target.value) }} />
                <Form.Label htmlFor='find-article'>Find an article...</Form.Label>
            </Form.Group>
        </Form>
    )
}
