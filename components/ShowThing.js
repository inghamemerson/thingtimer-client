import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { ALL_THINGS_QUERY } from './ListThings';
import ShowTimer from './ShowTimer';
import CreateTimer from './CreateTimer';
import { lifespan } from '../lib/helpers';

const DELETE_THING_MUTATION = gql`
  mutation deleteThing($id: ID!) {
    deleteThing(id: $id) {
      id
    }
  }
`;

const ShowThing = (props) => {
  const thing = props.thing;

  const [deleteThing] = useMutation(
    DELETE_THING_MUTATION,
    {
      update(cache, { data: { deleteThing } }) {
        const { things } = cache.readQuery({ query: ALL_THINGS_QUERY });
        cache.writeQuery({
          query: ALL_THINGS_QUERY,
          data: { things: things },
        });
      }
    }
  );

  return (
    <li>
      <div>
        <h2>
          {thing.title}
          {thing.quantity ? (<span> Qty:{thing.quantity}</span>) : ''}
          {thing.timers.length ? (<span> Lasts about: {lifespan(thing)}</span>) : ''}
        </h2>
      </div>
      <form onSubmit={e => {
          e.preventDefault();
          deleteThing({ variables: { id: thing.id } });
        }}>
        <button type="submit">
          Delete Thing
        </button>
      </form>
      <CreateTimer thing={thing} />
      <div>
        {thing.timers.map((timer) => (
          <ShowTimer key={timer.id} timer={timer} />
        ))}
      </div>
    </li>
  );
}

export default ShowThing;

