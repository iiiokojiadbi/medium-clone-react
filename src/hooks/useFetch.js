import {useState, useEffect} from 'react';
import useLocalStorage from './useLocalStorage';

export default (url) => {
  const baseUrl = 'https://conduit.productionready.io/api';
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState({});
  const [token] = useLocalStorage('token');

  const doFetch = (options = {}) => {
    setOptions(options);
    setIsLoading(true);
  };

  useEffect(() => {
    const requestOptinons = {
      method: options.method,
      headers: {
        'Content-Type': 'application/json',
        authorization: token ? `Token ${token}` : '',
      },
      body: options.body ? options.body : '',
    };
    if (isLoading) {
      fetch(baseUrl + url, requestOptinons)
        .then((response) =>
          response.json().then((data) => ({status: response.status, data}))
        )
        .then(({status, data}) => {
          if (status === 200) {
            setResponse(data);
          } else {
            setError(data);
          }
          setIsLoading(false);
        })
        .catch((err) => {
          setError(err);
          setIsLoading(false);
        });
    }
  }, [isLoading, options, url]);

  return [
    {
      isLoading,
      response,
      error,
    },
    doFetch,
  ];
};
