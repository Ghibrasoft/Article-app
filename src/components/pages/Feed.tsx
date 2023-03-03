import { Col, Row } from 'react-bootstrap'
import { AddArticle } from '../AddArticle'
import { Articles } from '../Articles'



export default function Feed() {
  return (
    <Row>
      <Col className="col-8 col-lg-8">
        <Articles />
      </Col>

      <Col className="col-4 col-lg-4">
        <AddArticle />
      </Col>
    </Row>
  )
}
