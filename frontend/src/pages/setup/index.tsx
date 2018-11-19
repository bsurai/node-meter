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
    const {data, error, loading, modified} = this.state;

    const show = [];
    if (loading) {
      show.push(<Loader key='spinner'/>);
    }

    if (error) {
      show.push(<UncontrolledAlert key='error' color="danger"> {error.message} </UncontrolledAlert>)
    }

    if (data && !loading) {
      show.push(this.renderForm(modified, loading, data));
    }

    return (
      <Container>
        {show}
      </Container
    >);
  }

  private handleChange = (key: keyof IData) => {
    return (event: any) => {
      Controller.handleChange(this, key, event.target.value);
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

  private renderForm = (modified: boolean, loading:boolean, data: IData) => {
    const {userAgent, host, workers, rampUp, requests, utm} = data;
    return <Fade tag='div' key='form'>
              <br/>
              <Button disabled={modified || loading} color="success" onClick={this.onStart}>Start</Button>{' '}
              <Button disabled={modified || loading} color="secondary" onClick={this.onStop}>Stop</Button>{' '}
              <Button disabled={!modified || loading} color="warning" onClick={this.onApply}>Apply</Button>
              <br/><br/>
              <Form
                host={host || ''}
                maxWorkers={workers || 0}
                rampUpInterval={rampUp || 0}
                requestsPerInterval={requests || 0}
                utm={utm || ''}
                useragent={userAgent}
                handleChange={this.handleChange}/>
            </Fade>
  }
}

export default SetupPage;
