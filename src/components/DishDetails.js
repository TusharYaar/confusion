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
import { Control, LocalForm, Errors } from "react-redux-form";

function RenderDish({ dish }) {
  return (
    <div className="col-12 col-md-5 m-1">
      <Card>
        <CardImg top src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>
            {" "}
            <h4>{dish.name}</h4>
          </CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}

function RenderComments({ comments }) {
  return comments.map((comment) => {
    return (
      <div key={`c-${comment.id}`} className="my-3">
        {" "}
        <div>{comment.comment}</div>
        --{comment.author},{" "}
        {new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit",
        }).format(new Date(Date.parse(comment.date)))}
      </div>
    );
  });
}

function RenderAll({ props, onclick }) {
  if (props.dish !== undefined || props != null) {
    return (
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
    this.props.addComment(this.props.dish.id,values.rating,values.name,values.comment);
    this.setState({ isCommentModalOpen: false });
  }

  render() {
    const required = (val) => val && val.length;
    const maxLength = (len) => (val) => !val || val.length <= len;
    const minLength = (len) => (val) => val && val.length >= len;
    return (
      <div className="container">
        <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/menu">Menu</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
        </Breadcrumb>
        </div>
        <RenderAll props={this.props} onclick={this.toggleCommentModal} />
        <Modal
          isOpen={this.state.isCommentModalOpen}
          toggle={this.toggleCommentModal}
        >
          <ModalHeader toggle={this.toggleCommentModal}>Add Commit</ModalHeader>
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
