import { gql } from 'graphql-tag';

export const listTasks = gql`
  query ListTasks {
    listTasks {
      items {
        id
        title
        description
        dueDate
        assignedPerson
        status
      }
    }
  }
`;

export const createTask = gql`
  mutation CreateTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      id
      title
      description
      dueDate
      assignedPerson
      status
    }
  }
`;

export const updateTask = gql`
  mutation UpdateTask($input: UpdateTaskInput!) {
    updateTask(input: $input) {
      id
      title
      description
      dueDate
      assignedPerson
      status
    }
  }
`;

export const deleteTask = gql`
  mutation DeleteTask($input: DeleteTaskInput!) {
    deleteTask(input: $input) {
      id
    }
  }
`;