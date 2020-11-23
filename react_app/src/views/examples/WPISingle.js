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

class WPISingle extends React.Component {
  state = {
    wpi : "None",
    wpi_class: "None",
    data: {

    }
  };
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this); 
  }
  handleSubmit(event) {
    event.preventDefault()
    var url = new URL("http://localhost:5000/calculate_wpi_single");
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
    .then(res => res.json())
    .then(res => {
        console.log(res)
        this.setState({
          wpi : res["wpi"],
          wpi_class: res["wpi_class"]
        });
    });
  }
  onChange(e) {
    if(e.target.id === 'turbidityField') {
      let newState = Object.assign({}, this.state.data);
      newState['turbidity'] = e.target.value;
      this.setState({data : newState});
    }
    else if(e.target.id === 'phField') {
      let newState = Object.assign({}, this.state.data);
      newState['pH'] = e.target.value;
      this.setState({data : newState});
    }
    else if(e.target.id === 'colorField') {
      let newState = Object.assign({}, this.state.data);
      newState['color'] = e.target.value;
      this.setState({data : newState});
    }
    else if(e.target.id === 'doField') {
      let newState = Object.assign({}, this.state.data);
      newState['do'] = e.target.value;
      this.setState({data : newState});
    }
    else if(e.target.id === 'bodField') {
      let newState = Object.assign({}, this.state.data);
      newState['bod'] = e.target.value;
      this.setState({data : newState});
    }
    else if(e.target.id === 'tdsField') {
      let newState = Object.assign({}, this.state.data);
      newState['tds'] = e.target.value;
      this.setState({data : newState});
    }
    else if(e.target.id === 'hardnessField') {
      let newState = Object.assign({}, this.state.data);
      newState['hardness'] = e.target.value;
      this.setState({data : newState});
    }
    else if(e.target.id === 'clField') {
      let newState = Object.assign({}, this.state.data);
      newState['cl'] = e.target.value;
      this.setState({data : newState});
    }
    else if(e.target.id === 'no3Field') {
      let newState = Object.assign({}, this.state.data);
      newState['no3'] = e.target.value;
      this.setState({data : newState});
    }
    else if(e.target.id === 'so4Field') {
      let newState = Object.assign({}, this.state.data);
      newState['so4'] = e.target.value;
      this.setState({data : newState});
    }
    else if(e.target.id === 'coliField') {
      let newState = Object.assign({}, this.state.data);
      newState['coli'] = e.target.value;
      this.setState({data : newState});
    }
    else if(e.target.id === 'asField') {
      let newState = Object.assign({}, this.state.data);
      newState['as'] = e.target.value;
      this.setState({data : newState});
    }
    else {
      let newState = Object.assign({}, this.state.data);
      newState['f'] = e.target.value;
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
                  <h2 className="title">Calculate WPI for single sample</h2>
                  <Card className="card-register">
                    <CardBody>
                      <Form className="form" onSubmit = {this.handleSubmit}>
                        <FormGroup>
                          <Label for="turbidityField">Turbidity</Label>
                          <Input
                            onChange={this.onChange}
                            type="number"
                            min = "0"
                            max = "500"
                            step = "0.0001"
                            name="turbidity"
                            id="turbidityField"
                            placeholder="Enter Turbidity value in NTU"
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="phField">pH</Label>
                          <Input
                            onChange={this.onChange}
                            type="number"
                            min = "0"
                            max = "14"
                            step = "0.0001"
                            name="ph"
                            id="phField"
                            placeholder="Enter pH value"
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="colorField">Color</Label>
                          <Input
                            onChange={this.onChange}
                            type="number"
                            min = "10"
                            max = "1200"
                            step = "0.0001"
                            name="color"
                            id="colorField"
                            placeholder="Enter Color Value in Hazen Units"
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="doField">DO(%)</Label>
                          <Input
                            onChange={this.onChange}
                            type="number"
                            min = "0"
                            step = "0.0001"
                            name="do"
                            id="doField"
                            placeholder="Enter % of Dissolved Oxygen"
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="bodField">BOD</Label>
                          <Input
                            onChange={this.onChange}
                            type="number"
                            min = "0"
                            max = "30"
                            step = "0.0001"
                            name="bod"
                            id="bodField"
                            placeholder="Enter BOD value in mg/L"
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="tdsField">TDS</Label>
                          <Input
                            onChange={this.onChange}
                            type="number"
                            min = "0"
                            max = "6000"
                            step = "0.0001"
                            name="tds"
                            id="tdsField"
                            placeholder="Enter TDS value in mg/L"
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="hardnessField">Hardness</Label>
                          <Input
                            onChange={this.onChange}
                            type="number"
                            min = "0"
                            step = "0.0001"
                            name="hardness"
                            id="hardnessField"
                            placeholder="Enter Hardness value in mg/L"
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="clField">CL</Label>
                          <Input
                            onChange={this.onChange}
                            type="number"
                            min = "0"
                            step = "0.0001"
                            name="cl"
                            id="clField"
                            placeholder="Enter concentration level of CL in mg/L"
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="no3Field">NO3</Label>
                          <Input
                            onChange={this.onChange}
                            type="number"
                            min = "0"
                            max = "200"
                            step = "0.0001"
                            name="no3"
                            id="no3Field"
                            placeholder="Enter concentration level of NO3 in mg/L"
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="so4Field">SO4</Label>
                          <Input
                            onChange={this.onChange}
                            type="number"
                            min = "0"
                            max = "2000"
                            step = "0.0001"
                            name="so4"
                            id="so4Field"
                            placeholder="Enter concentration level of SO4 in mg/L"
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="coliField">Coli</Label>
                          <Input
                            onChange={this.onChange}
                            type="number"
                            min = "0"
                            step = "0.0001"
                            name="coli"
                            id="coliField"
                            placeholder="Enter total coliform count in MPN/100ml"
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="asField">As</Label>
                          <Input
                            onChange={this.onChange}
                            type="number"
                            min = "0"
                            max = "1.3"
                            step = "0.0001"
                            name="as"
                            id="asField"
                            placeholder="Enter concentration level of Arsenic in mg/L"
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="fField">F</Label>
                          <Input
                            onChange={this.onChange}
                            type="number"
                            min = "0"
                            max = "10"
                            step = "0.0001"
                            name="f"
                            id="fField"
                            placeholder="Enter concentration level of Fluorine in mg/L"
                          />
                        </FormGroup>
                      <Button className="btn-round" color="primary" size="lg">
                        Caculate WPI
                      </Button>
                      </Form>
                    </CardBody>
                  </Card>
                  { this.state.wpi_class != "None" && <Card>
                  <CardBody>
                  <h3 className="display-3 text-white">
                     {this.state.wpi_class}
                    {/* <span className="text-white">be as defined below</span> */}
                  </h3>
                  <font color = "white">
                  { this.state.wpi != "None" &&
                   <div>Water Pollution Index: {this.state.wpi} </div> }
                      </font>
                  </CardBody>
                  </Card>}
                </Col>
                
                
              </Row>
            </Container>
            </div>
        </div>
      </>
    );
  }
}

export default WPISingle;