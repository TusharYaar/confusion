import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
} from "reactstrap";

class DishDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dish: null,
    };
  }
  render() {
    const comments = this.props.dish.comments.map((comment) => {
      return (<div key={`c-${comment.id}`}> <div>{comment.comment}</div>
    --{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</div>) });

    return (
      <div className = "container">
    <div  className="row ">
      <div className="col-12 col-md-5 m-1">
        <Card>
          <CardImg top src={this.props.dish.image} alt={this.props.dish.name} />
          <CardBody>
            <CardTitle> <h4>{this.props.dish.name}</h4></CardTitle>
            <CardText>{this.props.dish.description}</CardText>
          </CardBody>
        </Card>
      </div>
      <div className="col-12 col-md-5 m-1">
        <h4>Comments</h4>
          {comments}
      </div>
      </div>
      </div>
    );
  }
}

export default DishDetails;
