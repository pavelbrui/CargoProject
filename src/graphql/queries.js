import { gql } from '@apollo/client';


// GraphQL queries and mutations
export const CALCULATE_ORDER = gql`
    query calculateMyOrder($input: CalculateOrderInput!) {
        public {
            calculateMyOrder(input: $input)
        }
    }
`;

