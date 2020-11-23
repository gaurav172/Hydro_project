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
import DatePicker from 'react-date-picker';
import Indices from './Indices.js'
import Features from './Features.js'
import YearlyFeatures from './YearlyFeatures.js'
import YearlyIndices from './YearlyIndices.js'
import './../../assets/css/styles.css'
import { withWindowState } from 'react-window-state';
import Et_graph from './Et_graph.js'

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

class ET extends React.Component {
  start = '1995-06';
  end = '2017-05';
  min_dt = new Date('1995-06');
  max_dt = new Date('2017-05');
  state = {
    data: [],
    canvas_width: 1000 / 1792 * window.innerWidth,
    canvas_height: 0.6 * window.innerHeight,
    tmin: null,
    tmax: null,
    rh: null,
    wind: null,
    sunshine: null,
    rs: null
  };

  constructor(props) {
    super(props);
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  static getDerivedStateFromProps(props, current_state) {
    if (current_state.canvas_width !== props.win.width * 1000 / 1792 || current_state.canvas_height !== props.win.height * 550 / 716) {
      return {
        canvas_width: props.win.width * 1000 / 1792,
        canvas_height: props.win.height * 0.6
      }
    }
    return null
  }

  load_et() {
    const {
      tmin,
      tmax,
      rh,
      wind,
      sunshine,
      rs
    } = this.state;
    if (!tmax || !tmin || !rh || !wind || !sunshine || !rs) {
      return;
    }
    var url = `/get_et?tmin=${encodeURIComponent(tmin)}`
    url = url + `&tmax=${encodeURIComponent(tmax)}`;
    url = url + `&rh=${encodeURIComponent(rh)}`
    url = url + `&wind=${encodeURIComponent(wind)}`
    url = url + `&sunshine=${encodeURIComponent(sunshine)}`
    url = url + `&rs=${encodeURIComponent(rs)}`
    fetch(url, {
      method: 'GET',
    })
      .then(response => {
        console.log('get_et response is', response);
        return response.json();
      })
      .then(res => {
        var data = [];
        for (var i = 0; i < res.dates.length; i++) {
          data.push({ 'date': res.dates[i], 'et_act': res.et_act[i], 'volume': res.volume[i] });
        }
        this.setState({ data: data });
      })
      .catch(error => console.log(error)
      );
  }


  componentDidMount() {
    document.body.classList.toggle("index-page");
  }
  componentWillUnmount() {
    document.body.classList.toggle("index-page");
  }

  onChange(e) {
    if (e.target.id === 'tmin_field') {
      this.setState({ tmin: e.target.value });
    }
    else if (e.target.id === 'tmax_field') {
      this.setState({ tmax: e.target.value });
    }
    else if (e.target.id === 'rh_field') {
      this.setState({ rh: e.target.value });
    }
    else if (e.target.id === 'wind_field') {
      this.setState({ wind: e.target.value });
    }
    else if (e.target.id === 'sun_field') {
      this.setState({ sunshine: e.target.value });
    }
    else if (e.target.id === 'rs_field') {
      this.setState({ rs: e.target.value });
    }
  }

  handleSubmit = () => {
    this.load_et();
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
                <Col className="mb-lg-auto" lg="4">
                  <h2 className="title">Evapotranspiration Tool</h2>
                  <Card className="card-register">
                    <CardBody>
                      <Form className="form" onSubmit={this.handleSubmit}><br></br>
                        <Container>
                          <Row>
                            <Col>
                              <FormGroup>
                                <Label for="tmin_field">Daily Minimum Temperature(C)</Label>
                                <Input
                                  onChange={this.onChange}
                                  type="number"
                                  min="-100"
                                  max="200"
                                  step="0.1"
                                  name="tmin"
                                  id="tmin_field"
                                  placeholder="Celcius"
                                />
                              </FormGroup>
                            </Col>
                            <Col>
                              <FormGroup>
                                <Label for="tmax_field">Daily Maximum Temperature(C)</Label>
                                <Input
                                  onChange={this.onChange}
                                  type="number"
                                  min="-100"
                                  max="200"
                                  step="0.1"
                                  name="tmax"
                                  id="tmax_field"
                                  placeholder="Celcius"
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>

                            <Col>
                              <FormGroup>
                                <Label for="rh_field">Relative Humidity(%)</Label>
                                <Input
                                  onChange={this.onChange}
                                  type="number"
                                  min="0"
                                  max="100"
                                  step="1"
                                  name="rh"
                                  id="rh_field"
                                  placeholder="%"
                                />
                              </FormGroup>
                            </Col>
                            <Col>
                              <FormGroup>
                                <Label for="wind_field">Wind Speed(m/s)</Label>
                                <Input
                                  onChange={this.onChange}
                                  type="number"
                                  min="0"
                                  max="10000"
                                  step="1"
                                  name="wind"
                                  id="wind_field"
                                  placeholder="m/s"
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <FormGroup>
                                <Label for="sun_field">Sunshine(h/h)</Label>
                                <Input
                                  onChange={this.onChange}
                                  type="number"
                                  min="0"
                                  max="1"
                                  step="0.001"
                                  name="sunshine"
                                  id="sun_field"
                                  placeholder="h/h"
                                />
                              </FormGroup>
                            </Col>
                            <Col>
                              <FormGroup>
                                <Label for="rs_field">GR MJ/(m2 day)</Label>
                                <Input
                                  onChange={this.onChange}
                                  type="number"
                                  name="rs"
                                  id="rs_field"
                                  placeholder="MJ/(m2 day)"
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        </Container>
                        <div className="wpibutton">
                          <Button className="btn-round" color="primary" size="lg" onClick={this.handleSubmit}>
                            Submit
                                </Button>
                        </div>
                      </Form>
                    </CardBody>
                  </Card>
                </Col>
                <Col className="mb-lg-auto" lg="8">
                  {this.state.data.length !== 0 && <Et_graph data={this.state.data} width={this.state.canvas_width} height={this.state.canvas_height} />}
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </>
    )
  }
}

export default withWindowState(ET);