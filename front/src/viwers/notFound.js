import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";

import { Card, CardBody, CardTitle } from "shards-react";
function ErrorBox (props) {
    const componentBody = (
        <Card>
            <CardTitle>{ props.errorHeader }</CardTitle>
            <CardBody>{ props.errorBody}</CardBody>
        </Card>
    )
    return componentBody;
}

export default ErrorBox;
