/** @jsx jsx */
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { jsx } from '@emotion/core';
import { Grid, Typography, Button } from '@material-ui/core';
import * as moment from 'moment';
import * as store from 'store';
import { utcTimeAgo, timeDiff } from '../lib/helpers';
import { ALL_THINGS_QUERY } from './ListThings';

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
  let uuids = store.get('uuids') || [];

  const [updateTimer] = useMutation(UPDATE_TIMER_MUTATION, {refetchQueries: [{query: ALL_THINGS_QUERY, variables: {uuids}}],awaitRefetchQueries: true});
  const [deleteTimer] = useMutation(DELETE_TIMER_MUTATION, {refetchQueries: [{query: ALL_THINGS_QUERY, variables: {uuids}}],awaitRefetchQueries: true});

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
      <Typography variant="subtitle2" component="p" css={{
        marginTop: "20px"
      }}>
        {timer.name}{timer.ended_at ? (<span> - {timeDiff(timer.started_at, timer.ended_at)}</span>) : (<span> - {utcTimeAgo(timer.started_at)}</span>)}
      </Typography>

      <Grid container spacing={2} alignItems="flex-end" css={{
        marginTop: "20px"
      }}>
        {!timer.ended_at ? (
          <Grid item md={6} sm={12} xs={12}>
            <form onSubmit={handleUpdate}>
              <Button size="small" type="submit" variant="outlined" color="primary" fullWidth>
                Stop Timer
              </Button>
            </form>
          </Grid>
        ) : ''}
        <Grid item md={6} sm={12} xs={12}>
          <form onSubmit={e => {
            e.preventDefault();
            deleteTimer({ variables: { id: timer.id } });
          }}>
            <Button size="small" type="submit" variant="outlined" color="secondary" fullWidth>
              Delete Timer
            </Button>
          </form>
        </Grid>
      </Grid>
    </div>
  );
}

export default ShowTimer;