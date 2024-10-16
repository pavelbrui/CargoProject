import { gql } from '@apollo/client';



export const SEND_ORDER = gql`
    mutation SendOrder($input: SendOrderPublicInput!) {
        public {
            sendOrder(input: $input)
        }
    }
`;




export const REGISTER_USER = gql`
    mutation Register($user: RegisterInput!) {
        public {
            register(user: $user) {
                registered
                hasError
            }
        }
    }
`;