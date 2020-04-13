/** @jsx jsx */
import { useQuery } from '@apollo/react-hooks'
import { Grid } from '@material-ui/core';
import { jsx } from '@emotion/core';
import gql from 'graphql-tag';
import ShowThing from './ShowThing';

export const ALL_THINGS_QUERY = gql`
  query things {
    things(
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
  const { loading, error, data } = useQuery(ALL_THINGS_QUERY);

  if (loading) return <div>Loading...</div>;
  if (error) return `Error! ${error.message}`;

  return (
    <Grid container spacing={2} alignItems="flex-start" css={{
      marginTop: '20px'
    }}>
      {data.things.map((thing) => (
        <ShowThing key={thing.uuid} thing={thing} />
      ))}
    </Grid>
  );
}

export default ListThings;