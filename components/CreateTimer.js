import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import * as moment from 'moment';
import { ALL_THINGS_QUERY } from './ListThings';

const CREATE_TIMER_MUTATION = gql`
  mutation createTimer($name: String!, $thingId: String! $startedAt: DateTime!) {
    createTimer(name: $name, thing_id: $thingId, started_at: $startedAt) {
      id
      name
      started_at
      ended_at
    }
  }
`;

const CreateTimer = (props) => {
  const [createTimer, { loading }] = useMutation(CREATE_TIMER_MUTATION);

  const handleSubmit = event => {
    event.preventDefault();
    const thingId = props.thing.id;
    const form = event.target;
    const formData = new window.FormData(form);
    const name = formData.get('name');
    const startedAt = moment().utc().format('YYYY-MM-DD HH:mm:ss');
    form.reset();

    createTimer({variables: { name, thingId, startedAt }});
  }

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="name" name="name" type="text" required />
      <button type="submit" disabled={loading}>
        Start Timer
      </button>
    </form>
  )
}

export default CreateTimer; 