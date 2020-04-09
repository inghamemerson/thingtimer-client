import { useQuery } from '@apollo/react-hooks'
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
  const { loading, error, data } = useQuery(ALL_THINGS_QUERY, {
    pollInterval: 250,
  });

  if (loading) return <div>Loading...</div>;
  if (error) return `Error! ${error.message}`;

  return (
    <section>
      <ul>
        {data.things.map((thing) => (
          <ShowThing key={thing.uuid} thing={thing} />
        ))}
      </ul>
    </section>
  );
}

export default ListThings;