/** @jsx jsx */
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { jsx } from '@emotion/core';
import { Grid, Typography, Button, Card, CardActions, CardContent } from '@material-ui/core';
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

  const [deleteThing] = useMutation(DELETE_THING_MUTATION);

  return (
    <Grid item md={4} sm={6} xs={12}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="p">{thing.title}</Typography>
          <Typography variant="body2" component="p">
            {thing.quantity ? (<span> Qty:{thing.quantity}</span>) : ''}
            {lifespan(thing) ? (<span> &mdash; Lasts about: {lifespan(thing)}</span>) : ''}</Typography>
        </CardContent>
        <CardContent>
          <CreateTimer thing={thing} />
          <div>
            {thing.timers.map((timer) => (
              <ShowTimer key={timer.id} timer={timer} />
            ))}
          </div>
        </CardContent>
        <CardActions>
          <form onSubmit={e => {
              e.preventDefault();
              deleteThing({ variables: { id: thing.id } });
            }}>
            <Button type="submit" size="small" color="secondary">
              Delete Thing
            </Button>
          </form>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default ShowThing;
