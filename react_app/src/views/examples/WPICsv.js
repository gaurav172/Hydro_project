/*!

=========================================================
* BLK Design System React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/blk-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/blk-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import classnames from "classnames";
import { Link } from "react-router-dom";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  Label,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  FormText,
} from "reactstrap";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footer/Footer.js";

class WPICsv extends React.Component {
  state = {
    data : {level: 1,
      allow_encrypt : "yes",
      allow_decrypt : "yes"}
  };
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this); 
  }
  handleSubmit() {
    var url = new URL("http://localhost:5000/calculate_wpi_csv");
    const data = new FormData();
    Object.keys(this.state.data).forEach(key => data.append(key, this.state.data[key]))
    const requestOptions = {
      method: 'POST',
      // headers: {'Content-Type': 'application/json'},
      body: data,
    };
    // for(var key of requestOptions['body'].entries())
    // {
    //   console.log(key[0], "F", key[1]);
    // }
    console.log(this.state.data);
    console.log(data.get("name"));
    console.log("url ^^^");
    fetch(url, requestOptions)
    .then(response => {
        console.log("received");
        console.log(response);
        console.log("done");
        // for(var key in response){
        //   console.log(key, response[key])
        // }
    });
  }
  onChange(e) {
    if(e.target.id === 'nameField') {
      let newState = Object.assign({}, this.state.data);
      newState['name'] = e.target.value;
      this.setState({data : newState});
    }
    else if(e.target.id === 'typeField') {
      let newState = Object.assign({}, this.state.data);
      newState['type'] = e.target.value;
      this.setState({data : newState});
    }
    else if(e.target.id === 'descriptionField') {
      let newState = Object.assign({}, this.state.data);
      newState['description'] = e.target.value;
      this.setState({data : newState});
    }
    else if(e.target.id === 'challengeField') {
      let newState = Object.assign({}, this.state.data);
      newState['challenge'] = e.target.value;
      this.setState({data : newState});
    }
    else if(e.target.id === 'hintField') {
      let newState = Object.assign({}, this.state.data);
      newState['hint'] = e.target.value;
      this.setState({data : newState});
    }
    else if(e.target.id === 'solutionField') {
      let newState = Object.assign({}, this.state.data);
      newState['solution'] = e.target.value;
      this.setState({data : newState});
    }
    else if(e.target.id === 'levelField') {
      let newState = Object.assign({}, this.state.data);
      newState['level'] = e.target.value;
      this.setState({data : newState});
    }
    else if(e.target.id === 'allowEncryptField') {
      let newState = Object.assign({}, this.state.data);
      newState['allow_encrypt'] = e.target.value;
      this.setState({data : newState});
    }
    else if(e.target.id === 'allowDecryptField') {
      let newState = Object.assign({}, this.state.data);
      newState['allow_decrypt'] = e.target.value;
      this.setState({data : newState});
    }
    else {
      let newState = Object.assign({}, this.state.data);
      newState['selectedFile'] = e.target.files[0];
      console.log(newState['selectedFile'])
      this.setState({data : newState});
    }
  }
  componentDidMount() {
    document.body.classList.toggle("index-page");
  }
  componentWillUnmount() {
    document.body.classList.toggle("index-page");
  }
  render() {
    return (
      <>
        <IndexNavbar />
        <div className="wrapper">
            <div className="section section-signup">
            <Container>
              <div className="squares square-1" />
              <div className="squares square-2" />
              <div className="squares square-3" />
              <div className="squares square-4" />
              <Row className="row-grid justify-content-between align-items-center">
                <Col className="mb-lg-auto" lg="8">
                  <h2 className="title">Calculate WPI for CSV</h2>
                  <Card className="card-register">
                    <CardBody>
                      <Form className="form" onSubmit = {this.handleSubmit}>
                        <FormGroup>
                          <Label for="nameField">Name</Label>
                          <Input
                            onChange={this.onChange}
                            type="text"
                            name="name"
                            id="nameField"
                            placeholder="Name your Algorithm"
                            required
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="typeField">Type</Label>
                          <Input
                            onChange={this.onChange}
                            type="text"
                            name="type"
                            id="typeField"
                            placeholder="Specify Algorithm Type"
                            required
                          />
                        </FormGroup>

                        <FormGroup>
                          <Label for="descriptionField">Description</Label>
                          <Input
                            onChange={this.onChange}
                            type="textarea"
                            name="description"
                            id="descriptionField"
                            required
                          />
                        </FormGroup>

                        <FormGroup>
                          <Label for="challengeField">Challenge</Label>
                          <Input
                            onChange={this.onChange}
                            type="textarea"
                            name="challenge"
                            id="challengeField"
                            required
                          />
                        </FormGroup>

                        <FormGroup>
                          <Label for="hintField">Hint</Label>
                          <Input
                            onChange={this.onChange}
                            type="textarea"
                            name="hint"
                            id="hintField"
                          />
                        </FormGroup>
                        
                        <FormGroup>
                          <Label for="solutionField">Solution</Label>
                          <Input
                            onChange={this.onChange}
                            type="text"
                            name="solution"
                            id="solutionField"
                            placeholder="Enter solution of the challenge"
                            required
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="fileField">
                            <h4><Button
                              className="btn-icon btn-round"
                              color="primary"
                              type="button"
                            >
                              <i className="tim-icons icon-cloud-upload-94" />
                            </Button>
                            UPLOAD CSV</h4>
                          </Label>
                          <Input
                            type="file"
                            name="file"
                            id="fileField"
                            onChange={this.onChange}
                          />
                        </FormGroup>

                      <Button className="btn-round" color="primary" size="lg">
                        Calculate WPI
                      </Button>
                      </Form>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="4">
                  <h3 className="display-3 text-white">
                    The Algorithm Format should{" "}
                    <span className="text-white">be as defined below</span>
                  </h3>
                  <p className="text-white mb-3">
                    The Design System comes with four pre-built pages to help you
                    get started faster. You can change the text and images and
                    you're good to go. More importantly, looking at them will give
                    you a picture of what you can built with this powerful Bootstrap
                    4 Design System.
                  </p>
                </Col>
                
              </Row>
            </Container>
            </div>
          <Footer />
        </div>
      </>
    );
  }
}

export default WPICsv;