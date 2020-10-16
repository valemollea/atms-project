import { useState, useEffect } from 'react';
import api from '../api/api';

function UseAsyncHook(request) {
  const [result, setResult] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchAtms() {
      try {
        setLoading(true);
        const response = await api.post('/cajeros', request);

        const data = await response.data;
        setResult(
          data.map(item => {
            return item;
          })
        );
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error)
        setError(error.response.data.error)
      }
    }
    if (request) {
      fetchAtms();
    }
  }, [request]);

  return [result, loading, error];
}

export default UseAsyncHook;