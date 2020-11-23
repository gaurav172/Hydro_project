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

class DroughtTool extends React.Component {
  start = '1995-06';
  end = '2017-05';
  min_dt = new Date('1995-06');
  max_dt = new Date('2017-05');
  state = {
    data: [],
    inp_data: [],
    yearly_data: [],
    yearly_inp_data: [],
    canvas_width: 1000 / 1792 * window.innerWidth,
    canvas_height: 0.6 * window.innerHeight,
    threshold: -1.5,
    left_dt: this.min_dt,
    right_dt: this.max_dt,
    type: "features",
    discharge_file: "Upload discharge dataset",
    precip_file: "Upload precipitation dataset"
  };

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit() {
    var url = new URL("/");
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

  uploadFile(file, is_discharge) {
    var url;
    if (is_discharge) {
      this.setState({ discharge_file: file.name });
      url = '/send_discharge_data';
    }
    else {
      this.setState({ precip_file: file.name });
      url = '/send_precip_data';
    }

    var formData = new FormData();

    formData.append('file', file);
    fetch(url, {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(success => {
        console.log('success is', success);
        if (!is_discharge) {
          this.load_data();
          this.load_indices();
          this.load_yearly_data();
          this.load_yearly_indices();
        }
      })
      .catch(error => console.log(error)
      );
  }

  setFeatures = () => {
    console.log("Set features called");
    this.setState({ isindices: false });
  }

  setIndices = () => {
    console.log("Set indices called");
    this.setState({ isindices: true });
  }

  load_indices() {
    var url = `/get_indices?start=${encodeURIComponent(this.start)}&end=${encodeURIComponent(this.end)}`
    fetch(url, {
      method: 'GET',
    })
      .then(response => {
        console.log('response is', response);
        return response.json();
      })
      .then(res => {
        var data = [];
        for (var i = 0; i < res.dates.length; i++) {
          data.push({ 'date': res.dates[i], 'spi': res.spi[i], 'sdi': res.sdi[i] });
        }
        this.setState({ data: data });
      })
      .catch(error => console.log(error)
      );
  }

  load_yearly_indices() {
    var url = `/get_yearly_indices?start=${encodeURIComponent(this.start)}&end=${encodeURIComponent(this.end)}`
    fetch(url, {
      method: 'GET',
    })
      .then(response => {
        console.log('response is', response);
        return response.json();
      })
      .then(res => {
        var data = [];
        for (var i = 0; i < res.dates.length; i++) {
          data.push({ 'date': res.dates[i], 'spi': res.spi[i], 'sdi': res.sdi[i] });
        }
        this.setState({ yearly_data: data });
      })
      .catch(error => console.log(error)
      );
  }

  load_data = () => {
    var url = `/get_data?start=${encodeURIComponent(this.start)}&end=${encodeURIComponent(this.end)}`
    fetch(url, {
      method: 'GET',
    })
      .then(response => {
        console.log('/get_data response is', response);
        return response.json();
      })
      .then(res => {
        console.log(res);
        var inp_data = [];
        for (var i = 0; i < res.dates.length; i++) {
          inp_data.push({ 'date': res.dates[i], 'discharge': res.discharge[i], 'precip': res.precip[i] });
        }
        console.log(inp_data);
        this.setState({ inp_data: inp_data });
      })
      .catch(error => console.log(error)
      );
  }

  load_yearly_data = () => {
    var url = `/get_yearly_data?start=${encodeURIComponent(this.start)}&end=${encodeURIComponent(this.end)}`
    fetch(url, {
      method: 'GET',
    })
      .then(response => {
        console.log('/get_yearly_data response is', response);
        return response.json();
      })
      .then(res => {
        console.log(res);
        var inp_data = [];
        for (var i = 0; i < res.dates.length; i++) {
          inp_data.push({ 'date': res.dates[i], 'discharge': res.discharge[i], 'precip': res.precip[i] });
        }
        console.log(inp_data);
        this.setState({ yearly_inp_data: inp_data });
      })
      .catch(error => console.log(error)
      );
  }

  changeStartDate = (e) => {
    this.start = e.toISOString().substring(0, 10);
    this.setState({ left_dt: new Date(this.start) });
    this.load_indices();
    this.load_data();
    this.load_yearly_data();
    this.load_yearly_indices();
  }

  changeEndDate = (e) => {
    this.end = e.toISOString().substring(0, 10);
    this.setState({ right_dt: new Date(this.end) });
    this.load_indices();
    this.load_data();
    this.load_yearly_data();
    this.load_yearly_indices();
  }

  handleTypeChange = (e) => {
    this.setState({ type: e.target.value });
  }

  updateThreshold = (e) => {
    this.setState({ threshold: e.target.value });
  }

  onChange(e) {
    if (e.target.id === 'displayOption') {
      let newState = Object.assign({}, this.state.data);
      newState['type'] = e.target.value;
      this.setState({ data: newState });
    }
    // if(e.target.id === 'nameField') {
    //   let newState = Object.assign({}, this.state.data);
    //   newState['name'] = e.target.value;
    //   this.setState({data : newState});
    // }
    // else if(e.target.id === 'typeField') {
    //   let newState = Object.assign({}, this.state.data);
    //   newState['type'] = e.target.value;
    //   this.setState({data : newState});
    // }
    // else if(e.target.id === 'descriptionField') {
    //   let newState = Object.assign({}, this.state.data);
    //   newState['description'] = e.target.value;
    //   this.setState({data : newState});
    // }
    // else if(e.target.id === 'challengeField') {
    //   let newState = Object.assign({}, this.state.data);
    //   newState['challenge'] = e.target.value;
    //   this.setState({data : newState});
    // }
    // else if(e.target.id === 'hintField') {
    //   let newState = Object.assign({}, this.state.data);
    //   newState['hint'] = e.target.value;
    //   this.setState({data : newState});
    // }
    // else if(e.target.id === 'solutionField') {
    //   let newState = Object.assign({}, this.state.data);
    //   newState['solution'] = e.target.value;
    //   this.setState({data : newState});
    // }
    // else if(e.target.id === 'levelField') {
    //   let newState = Object.assign({}, this.state.data);
    //   newState['level'] = e.target.value;
    //   this.setState({data : newState});
    // }
    // else if(e.target.id === 'allowEncryptField') {
    //   let newState = Object.assign({}, this.state.data);
    //   newState['allow_encrypt'] = e.target.value;
    //   this.setState({data : newState});
    // }
    // else if(e.target.id === 'allowDecryptField') {
    //   let newState = Object.assign({}, this.state.data);
    //   newState['allow_decrypt'] = e.target.value;
    //   this.setState({data : newState});
    // }
    else if (e.target.id === "dischargeFile") {
      let newState = Object.assign({}, this.state.data);
      newState['discharge'] = e.target.files[0];
      console.log(newState['discharge'])
      this.setState({ data: newState });
    }
    else {
      let newState = Object.assign({}, this.state.data);
      newState['precipitation'] = e.target.files[0];
      console.log(newState['precipitation'])
      this.setState({ data: newState });
    }
  }
  componentDidMount() {
    document.body.classList.toggle("index-page");
  }
  componentWillUnmount() {
    document.body.classList.toggle("index-page");
  }
  render() {
    console.log('height & width : ', this.state.canvas_height, this.state.canvas_width);
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
                  <h2 className="title">Drought Tool</h2>
                  <Card className="card-register">
                    <CardBody>
                      <Form className="form" onSubmit={this.handleSubmit}><br></br>
                        <FormGroup>
                          <Label for="dischargeFile">
                            <h4><Button
                              className="btn-icon btn-round"
                              color="primary"
                              type="button"
                              style={{ cursor: 'pointer' }}
                            >
                              <i className="tim-icons icon-cloud-upload-94" />
                            </Button>  {this.state.discharge_file}</h4>
                          </Label>
                          <Input
                            type="file"
                            name="file"
                            id="dischargeFile"
                            style={{ cursor: 'pointer' }}
                            onChange={(e) => this.uploadFile(e.target.files[0], true)}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Label for="precipitationFile">
                            <h4><Button
                              className="btn-icon btn-round"
                              color="primary"
                              type="button"
                            >
                              <i className="tim-icons icon-cloud-upload-94" />
                            </Button>  {this.state.precip_file}</h4>
                          </Label>
                          <Input
                            type="file"
                            name="file"
                            id="precipitationFile"
                            style={{ cursor: 'pointer' }}
                            onChange={(e) => this.uploadFile(e.target.files[0], false)}
                          />
                        </FormGroup>

                        <FormGroup>
                          <div style={{ cursor: 'pointer', textAlign: 'center' }}>
                            <Label for="displayOption">Select display option</Label>
                            <select style={{ textAlignLast: "center", borderRadius: "1em", background: "transparent", width: "280px", color: "inherit", height: "40px" }} onChange={this.handleTypeChange}
                              type="text"
                              name="level"
                              id="displayOption"
                              required
                              style={{ cursor: 'pointer', textAlign: 'center' }}
                            >
                              <option value="features">Monthly Discharge & Precipitation</option>
                              <option value="yearly_features">Yearly Discharge & Precipitation</option>
                              <option value="indices">Monthly SPI & SDI</option>
                              <option value="yearly_indices">Yearly SPI & SDI</option>
                            </select>
                          </div>
                        </FormGroup><br></br>
                        <Container>
                          <Row>
                            <Col xs={4}>

                              <FormGroup>
                                <Label for="startMonth">Start Month  </Label><span>  </span>
                                <DatePicker calendarClassName="calendar" disableCalendar="true" clearIcon="" className="calendar" id="start_date" maxDetail="year" value={this.state.left_dt} minDate={this.min_dt} maxDate={this.max_dt} onChange={this.changeStartDate} />
                              </FormGroup>
                            </Col>
                            <Col xs={4} md={{ span: 4, offset: 2 }}>

                              <FormGroup>
                                <Label for="endMonth">End Month  </Label><span>  </span>
                                <DatePicker clearIcon="" disableCalendar="true" className="calendar" id="end_date" maxDetail="year" value={this.state.right_dt} minDate={this.min_dt} maxDate={this.max_dt} onChange={this.changeEndDate} />
                              </FormGroup>
                            </Col>

                          </Row>
                          <Row>
                            <Col>
                              <FormGroup controlId="formBasicRange">
                                <Label>Drought Threshold</Label>
                                <Input className="slider" type="range" step="0.1" min="-4" max="4" value={this.state.threshold} onChange={this.updateThreshold} />
                              </FormGroup>
                            </Col>
                          </Row>
                        </Container>
                      </Form>
                    </CardBody>
                  </Card>
                </Col>
                    <Col className="mb-lg-auto" lg="8">
                    {/* <Card className="card-register">
                  <CardBody> */}

                      {this.state.type === "indices" && <Indices data={this.state.data} threshold={this.state.threshold} width={this.state.canvas_width} height={this.state.canvas_height} />}
                      {this.state.type === "features" && <Features data={this.state.inp_data} width={this.state.canvas_width} height={this.state.canvas_height} />}
                      {this.state.type === "yearly_indices" && <YearlyIndices data={this.state.yearly_data} threshold={this.state.threshold} width={this.state.canvas_width} height={this.state.canvas_height} />}
                      {this.state.type === "yearly_features" && <YearlyFeatures data={this.state.yearly_inp_data} width={this.state.canvas_width} height={this.state.canvas_height} />}
                  {/* </CardBody>
                </Card> */}
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </>
    );
  }
}

export default withWindowState(DroughtTool);