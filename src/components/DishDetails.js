import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
  Row,
  Col,
  Breadcrumb,
  BreadcrumbItem
} from "reactstrap";
import {Link} from "react-router-dom";
import { Loading } from './LoadingComponent';
import { Control, LocalForm, Errors } from "react-redux-form";
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

function RenderDish({ dish }) {
  return (
<div className="col-12 col-md-6">    <FadeTransform
    in
    transformProps={{
        exitTransform: 'scale(0.5) translateY(-50%)'
    }}>
<Card>
    <CardImg top src={baseUrl + dish.image} alt={dish.name} />
    <CardBody>
        <CardTitle>{dish.name}</CardTitle>
        <CardText>{dish.description}</CardText>
    </CardBody>
</Card>
</FadeTransform>
</div>
  );
}

function RenderComments({ comments }) {
  return (
    
    <Stagger in>
    {comments.map((comment) => {
        return (
            <Fade in>
            <li key={comment.id}>
            <p>{comment.comment}</p>
            <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
            </li>
            </Fade>
        );
    })}
    </Stagger>
  )
}

function RenderAll({ props, onclick }) {
  if (props.isLoading) {
    return(
        <div className="container">
            <div className="row">            
                <Loading />
            </div>
        </div>
    );
}
else if (props.errMess) {
    return(
        <div className="container">
            <div className="row">            
                <h4>{props.errMess}</h4>
            </div>
        </div>
    );
}


  else if (props.dish !== undefined && props != null) {
    return (
      <div>
                <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/menu">Menu</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
        </Breadcrumb>
        </div>

      <div className="row ">
        <RenderDish dish={props.dish} />
        <div className="col-12 col-md-5 m-1">
          <h4>Comments</h4>
          <RenderComments comments={props.comments} />
          <Button
            type="submit"
            value="submit"
            color="outline-secondary mt-4"
            onClick={onclick}
          >
            <span className="fa fa-pencil fa-lg"></span> Submit Comment
          </Button>
        </div>
      </div>
      </div>
    );
  } else
    return (
      <div>
        {" "}
        <Button type="submit" value="submit" color="outline-secondary mt-4">
          <span className="fa fa-pencil fa-lg"></span> Submit Comment
        </Button>
      </div>
    );
}
class DishDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 1,
      name: "",
      comment: "",
      isCommentModalOpen: false,
    };
    this.toggleCommentModal = this.toggleCommentModal.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
  }
  toggleCommentModal() {
    this.setState({ isCommentModalOpen: !this.state.isCommentModalOpen });
  }
  handleCommentSubmit(values) {
    this.props.postComment(this.props.dish.id,values.rating,values.name,values.comment);
    this.setState({ isCommentModalOpen: false });
  }

  render() {
    const required = (val) => val && val.length;
    const maxLength = (len) => (val) => !val || val.length <= len;
    const minLength = (len) => (val) => val && val.length >= len;
    return (
      <div className="container">
        <RenderAll props={this.props} onclick={this.toggleCommentModal} />
        <Modal
          isOpen={this.state.isCommentModalOpen}
          toggle={this.toggleCommentModal}
        >
          <ModalHeader toggle={this.toggleCommentModal}>Add Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={this.handleCommentSubmit}>
              <FormGroup>
                <Row className="form-group">
                  <Label htmlFor="rating" md={2}>
                    Rating
                  </Label>
                  <Col md={{ size: 3, offset: 1 }}>
                    <Control.select
                      model=".rating"
                      id="rating"
                      name="rating"
                      className="form-control"
                    >
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </Control.select>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="name" md={2}>
                    Last Name
                  </Label>
                  <Col md={10}>
                    <Control.text
                      model=".name"
                      id="name"
                      rows={2}
                      name="name"
                      placeholder="Name"
                      className="form-control"
                      validators={{
                        required,
                        minLength: minLength(3),
                        maxLength: maxLength(15),
                      }}
                    />
                    <Errors
                      className="text-danger"
                      model=".name"
                      show="touched"
                      messages={{
                        required: "Required",
                        minLength: "Must be greater than 2 characters",
                        maxLength: "Must be 15 characters or less",
                      }}
                    />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="comment" md={2}>
                    comment
                  </Label>
                  <Col md={10}>
                    <Control.textarea
                      model=".comment"
                      id="comment"
                      rows="5"
                      name="comment"
                      className="form-control"
                      innerRef={(input) => (this.comment = input)}
                      validators={{
                        required,
                        minLength: minLength(3),
                        maxLength: maxLength(100),
                      }}
                    />
                    <Errors
                      className="text-danger"
                      model=".name"
                      show="touched"
                      messages={{
                        required: "Required",
                        minLength: "Must be greater than 2 characters",
                        maxLength: "Must be 100 characters or less",
                      }}
                    />
                  </Col>
                </Row>
              </FormGroup>
              <Button type="submit" value="submit" color="primary">
                Add Comment
              </Button>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
export default DishDetails;
