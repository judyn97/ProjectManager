import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8800', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export const endpoints = {
  projects: '/projects',
  departments: '/departments',
  tasks: '/tasks',
  comments: '/comments',
  buckets: '/buckets',
  events: '/events',
  updateBucketPosition: '/buckets/updatePosition',
  taskComments: (taskId) => `/tasks/${taskId}/comments`,
  taskById: (id) => `/tasks/${id}`,
  taskBucket: (numericId) => `/tasks/${numericId}/bucket`,
  taskDate: (task_id) => `/tasks/${task_id}/date`,
  taskProgress: (task_id) => `/tasks/${task_id}/progress`,
  eventById: (id) => `/events/${id}`,
  projectById: (id) => `/projects/${id}`,
  departmentById: (id) => `/departments/${id}`,
};

export default apiClient;
