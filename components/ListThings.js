/** @jsx jsx */
import { useQuery } from '@apollo/react-hooks'
import { Grid } from '@material-ui/core';
import { jsx } from '@emotion/core';
import * as store from 'store';
import gql from 'graphql-tag';
import CreateThing from '../components/CreateThing';
import ShowThing from './ShowThing';

export const ALL_THINGS_QUERY = gql`
  query things($uuids: [String!]) {
    things(
      uuids: $uuids,
      orderBy: [
        {
          field: "created_at",
          order: DESC
        }
      ]
    ) {
      id
      uuid
      title
      quantity
      timers {
        id
        name
        started_at
        ended_at
      }
    }
  }
`;

const ListThings = () => {
  let uuids = store.get('uuids') || [];
  const { loading, error, data, refetch } = useQuery(ALL_THINGS_QUERY, {
    variables: {uuids}
  });

  if (loading) return <div>Loading...</div>;
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      <CreateThing refetch={refetch} />
      <Grid container spacing={2} alignItems="flex-start" css={{
        marginTop: '20px'
      }}>
        {data.things.map((thing) => (
          <ShowThing key={thing.uuid} thing={thing} />
        ))}
      </Grid>
    </div>
  );
}

export default ListThings;