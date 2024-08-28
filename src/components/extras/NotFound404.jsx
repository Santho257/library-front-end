import { Card, CardBody, CardText, CardTitle, Container } from 'react-bootstrap'

export default function () {
    return (
        <Container className='my-5'>
            <Card>
                <Card.Header>
                    <CardTitle className='text-danger'>404 Not found!</CardTitle>
                </Card.Header>
                <CardBody>
                    <CardText>
                        You are looking for the page that is not available.
                    </CardText>
                </CardBody>
            </Card>
        </Container>
    )
}
