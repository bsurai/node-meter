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
  log200: boolean;
  log300: boolean;
  log400: boolean;
  log500: boolean;
  logError: boolean;
  handleChange: (key: keyof IData) => (event: any) => void
}

const SetupForm = (props: IFormProps) => {
  const {host, maxWorkers, rampUpInterval, requestsPerInterval, utm, useragent, handleChange, log200, log300, log400, log500, logError} = props;
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

        <Row>
          <Col sm={4}><Label>Log responses</Label></Col>
          <Col style={{textAlign: 'left'}}>
            <FormGroup check inline>
              <Label check>
                <Input type="checkbox" checked={log200} onChange={handleChange('log200')}/> 200
              </Label>
            </FormGroup>
            <FormGroup check inline>
              <Label check>
                <Input type="checkbox" checked={log300} onChange={handleChange('log300')}/> 300
              </Label>
            </FormGroup>
            <FormGroup check inline>
              <Label check>
                <Input type="checkbox" checked={log400} onChange={handleChange('log400')}/> 400
              </Label>
            </FormGroup>
            <FormGroup check inline>
              <Label check>
                <Input type="checkbox" checked={log500} onChange={handleChange('log500')}/> 500
              </Label>
            </FormGroup>
            <FormGroup check inline>
              <Label check>
                <Input type="checkbox" checked={logError} onChange={handleChange('logError')}/> Other errors
              </Label>
            </FormGroup>
          </Col>
        </Row>
      </Form>
    </>);
}

export default SetupForm;