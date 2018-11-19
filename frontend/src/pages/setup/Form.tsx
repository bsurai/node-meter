import * as React from 'react';
import { Col, Row, Form, FormGroup, Label, Input } from 'reactstrap';
import {IData} from './Controller';

interface IFormProps {
  host: string;
  maxWorkers: number;
  rampUpInterval: number;
  requestsPerInterval: number;
  utm: string;
  useragent: string;
  handleChange: (key: keyof IData) => (event: any) => void
}

const SetupForm = (props: IFormProps) => {
  console.log('--SetupForm');
  const {host, maxWorkers, rampUpInterval, requestsPerInterval, utm, useragent, handleChange} = props;
  return (
    <>
      <Form>
        <FormGroup>
          <Row>
            <Col sm={4}><Label for="host">Host</Label></Col>
            <Col>
              <Input type="text" name="host" id="host"
                    placeholder="write a host name here" defaultValue={host}
                    onChange={handleChange('host')}/>
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col sm={4}><Label for="utm">UTM</Label></Col>
            <Col>
              <Input sm={8} type="text" name="utm" id="utm"
                    placeholder="utm label" defaultValue={utm}
                    onChange={handleChange('utm')}/>
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col sm={4}><Label for="useragent">User-Agent</Label></Col>
            <Col>
              <Input type="text" name="useragent" id="useragent"
                    placeholder="User-Agent" defaultValue={useragent}
                    onChange={handleChange('userAgent')}/>
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col sm={4}><Label for="rampup">Ramp-Up</Label></Col>
            <Col>
              <Input type="number" name="rampup" id="rampup"
                    placeholder="Ramp-Up interval (ms)" defaultValue={`${rampUpInterval}`}
                    onChange={handleChange('rampUp')}/>
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col sm={4}><Label for="requests">Requests per interval</Label></Col>
            <Col>
              <Input type="number" name="requests" id="requests"
                    placeholder="Write a number" value={`${requestsPerInterval}`}
                    onChange={handleChange('requests')}/>
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col sm={4}><Label for="workers">Max workers</Label></Col>
            <Col>
              <Input type="number" name="workers" id="workers"
                    placeholder="Write a number" value={`${maxWorkers}`}
                    onChange={handleChange('workers')}/>
            </Col>
          </Row>
        </FormGroup>
      </Form>
    </>);
}

export default SetupForm;