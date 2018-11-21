import * as React from 'react';
import Form from './Form';
import Loader from '../../components/LoaderBallClimbingDot';
import Controller from './Controller';
import {IData, IState} from './Controller';
import {Button, Container, Fade, UncontrolledAlert} from 'reactstrap';

class SetupPage extends React.PureComponent<any, IState> {

  public state: IState = Controller.state()

  public componentDidMount() {
    Controller.fetch(this);
  }

  public render() {
    const {data, error, loading, modified, running} = this.state;

    const show = [];
    if (loading) {
      show.push(<Loader key='spinner'/>);
    }

    if (error) {
      show.push(<UncontrolledAlert key='error' color="danger"> {error.message} </UncontrolledAlert>)
    }

    if (data && !loading) {
      show.push(this.renderForm(modified, loading, running, data));
    }

    return (
      <Container>
        {show}
      </Container
    >);
  }

  private handleChange = (key: keyof IData) => {
    return (event: any) => {
     if (event.target.type === 'checkbox') {
        Controller.handleChangeCheckbox(this, key, event.target.checked);
      }
      else {
        Controller.handleChangeInput(this, key, event.target.value);
      }
      
      
    };
  }

  private onApply = () => {
    Controller.applyData(this);
  }

  private onStart = () => {
    Controller.startMeter(this);
  }

  private onStop = () => {
    Controller.stopMeter(this);
  }

  private renderForm = (modified: boolean, loading:boolean, running:boolean, data: IData) => {
    const {userAgent, host, workers, rampUp, requests, utm, log200, log300, log400, log500, logError} = data;
    return <Fade tag='div' key='form'>
              <br/>
              <Button disabled={modified || loading || running} color="success" onClick={this.onStart}>Start</Button>{' '}
              <Button disabled={loading || !running} color="secondary" onClick={this.onStop}>Stop</Button>{' '}
              <Button disabled={!modified || loading} color="warning" onClick={this.onApply}>Apply</Button>
              <br/><br/>
              <Form
                host={host || ''}
                maxWorkers={workers || 0}
                rampUpInterval={rampUp || 0}
                requestsPerInterval={requests || 0}
                utm={utm || ''}
                useragent={userAgent}
                log200={log200}
                log300={log300}
                log400={log400}
                log500={log500}
                logError={logError}
                handleChange={this.handleChange}/>
            </Fade>
  }
}

export default SetupPage;
