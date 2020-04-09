/** @jsx jsx */
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { jsx } from '@emotion/core';
import { Grid, Typography, Button, Card, CardActions, CardContent } from '@material-ui/core';
import * as moment from 'moment';
import { utcTimeAgo, timeDiff } from '../lib/helpers';

const DELETE_TIMER_MUTATION = gql`
  mutation deleteTimer($id: ID!) {
    deleteTimer(id: $id) {
      id
      name
    }
  }
`;

const UPDATE_TIMER_MUTATION = gql`
  mutation updateTimer($id: ID!, $name: String, $startedAt: DateTime, $endedAt: DateTime) {
    updateTimer(id: $id, name: $name, started_at: $startedAt, ended_at: $endedAt) {
      id
      name
      started_at
      ended_at
    }
  }
`;

const ShowTimer = (props) => {
  const timer = props.timer;
  const [updateTimer] = useMutation(UPDATE_TIMER_MUTATION);

  const [deleteTimer] = useMutation(DELETE_TIMER_MUTATION);

  const handleUpdate = event => {
    event.preventDefault();
    const id = timer.id;
    const endedAt = moment().utc().format('YYYY-MM-DD HH:mm:ss');

    updateTimer({
      variables: { id, endedAt }
    });
  }

  return (
    <div>
      <p>{timer.name}</p>
      {timer.ended_at ? (
        <p>{timeDiff(timer.started_at, timer.ended_at)}</p>
      ) : (
        <div>
          <p>{utcTimeAgo(timer.started_at)}</p>
          <form onSubmit={handleUpdate}>
            <button type="submit">
              Stop Timer
            </button>
          </form>
        </div>
      )}
      <form onSubmit={e => {
          e.preventDefault();
          deleteTimer({ variables: { id: timer.id } });
        }}>
        <button type="submit">
          delete
        </button>
      </form>
    </div>
  );
}

export default ShowTimer;