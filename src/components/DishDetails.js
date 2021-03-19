import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";


  function RenderDish({dish}) {
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
function RenderComments({comments}) {
    return comments.map((comment) => {
      return (
        <div key={`c-${comment.id}`}>
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
  function DishDetails(props) {
    if (props.dish !== undefined  || props!= null) {
      return (
        <div className="container">
          <div className="row ">
            <RenderDish dish={props.dish} />
            <div className="col-12 col-md-5 m-1">
              <h4>Comments</h4>
              <RenderComments comments={props.comments}/>
            </div>
          </div>
        </div>
      );
    } else return <div></div>;
  }


export default DishDetails;
