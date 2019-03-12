import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'

class PostForm extends Component {
  constructor () {
    super()

    this.state = {}
  }

  render () {
    const { handleChange, handleSubmit, post } = this.props
    // console.log(this.state.post)
    return (
      <Form>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="A bowl of rice pilaf."
            onChange={handleChange}
            name='title'
            value={post.title}
          />
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            placeholder="We are going to a vacation and I don't want to dump this rice pilaf. I will be home for the next 4 hours."
            onChange={handleChange}
            name='body'
            value={post.body}
          />
        </Form.Group>

        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="112 Johnson St. Broadway, Boston 02102 MA"
            onChange={handleChange}
            name='address'
            value={post.address}
          />
        </Form.Group>

        <Form.Row>
          <Form.Group as={Col} controlId="image_1">
            <Form.Label>Image 1</Form.Label>
            <Form.Control
              type="text"
              placeholder="https://address.com/your_img"
              onChange={handleChange}
              name='image_1'
              value={post.image_1}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="image_2">
            <Form.Label>Image 2</Form.Label>
            <Form.Control
              type="text"
              placeholder="https://address.com/your_img"
              onChange={handleChange}
              name='image_2'
              value={post.image_2}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="image_3">
            <Form.Label>Image 3</Form.Label>
            <Form.Control
              type="text"
              placeholder="https://address.com/your_img"
              onChange={handleChange}
              name='image_3'
              value={post.image_3}
            />
          </Form.Group>
        </Form.Row>

        <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
      </Form>
    )
  }
}

export default PostForm
