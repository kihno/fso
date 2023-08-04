import axios from 'axios';
import { Entry, NewEntry } from '../types';

const baseUrl = 'http://localhost:3001/api/diaries';

export const getDiary = () => {
  return axios.get<Entry[]>(baseUrl).then(response => response.data)
}

export const createEntry = (object: NewEntry) => {
  return axios.post<Entry>(baseUrl, object).then(response => response.data);
}
