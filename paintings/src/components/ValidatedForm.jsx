import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Home } from './Home';
import { Field, Formik } from 'formik';
import { ValidateSchema } from '../validationschema/ValidateSchema';

export function ValidatedForm() {
    return (
        <>
            <Home></Home>
            <Container>
                <Formik initialValues={{ name: "", phone: "", email: "", password: "" }}
                    validationSchema={ValidateSchema}
                    onSubmit={(values) => {
                        console.log(values); // Log the actual form values
                    }}
                    >

                    {
                        (formik) => {
                            const { errors, touched, isValid, dirty } = formik;
                            return (
                                <>
                                    <Row className="justify-content-md-center mt-5">
                                        <Col lg={4}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Name</Form.Label>
                                                <Field id="name" name="name" placeholder="Enter Name" className="form-control" />
                                                {touched.name && errors.name?<span className='error'>{errors.name}</span>:null}
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row className="justify-content-md-center">
                                        <Col lg={4}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Phone</Form.Label>
                                                <Field id="phone" name="phone" placeholder="Enter Phone" className="form-control" />
                                                {touched.phone && errors.phone?<span className='error'>{errors.phone}</span>:null}
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row className="justify-content-md-center">
                                        <Col lg={4}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Email</Form.Label>
                                                <Field id="email" name="email" placeholder="Enter Email" className="form-control" />
                                                {touched.email && errors.email?<span className='error'>{errors.email}</span>:null}
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row className="justify-content-md-center">
                                        <Col lg={4}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Password</Form.Label>
                                                <Field id="password" name="password" placeholder="Enter Password" className="form-control" />
                                                {touched.password && errors.password?<span className='error'>{errors.password}</span>:null}
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row className="mt-3 justify-content-md-center" >
                                        <Col lg={1}>
                                            <Button variant="primary" type="submit" disabled={(!dirty && isValid)}>Sign Up</Button>
                                        </Col>
                                    </Row>
                                </>
                            );
                        }
                    }

                </Formik>
            </Container>
        </>
    );
}