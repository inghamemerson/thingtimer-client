import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import * as moment from 'moment';
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
  const [updateTimer] = useMutation(UPDATE_TIMER_MUTATION);

  const [deleteTimer] = useMutation(
    DELETE_TIMER_MUTATION,
    {
      update(cache, { data: { deleteTimer } }) {
        const { things } = cache.readQuery({ query: ALL_THINGS_QUERY });
        cache.writeQuery({
          query: ALL_THINGS_QUERY,
          data: { things: things },
        });
      }
    }
  );

  const handleUpdate = event => {
    event.preventDefault();
    const id = timer.id;
    const endedAt = moment().utc().format('YYYY-MM-DD HH:mm:ss');

    updateTimer({
      variables: { id, endedAt },
      update: (cache, { data: { updateTimer } }) => {
        const data = cache.readQuery({
          query: ALL_THINGS_QUERY
        })
        // Update the cache with the new timer at the top
        cache.writeQuery({
          query: ALL_THINGS_QUERY,
          data: {
            ...data,
            things: [...data.things],
          }
        })
      },
    })
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