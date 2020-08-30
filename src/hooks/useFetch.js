import {useState, useEffect} from 'react';

export default (url) => {
  const baseUrl = 'https://conduit.productionready.io/api';
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState({});

  const doFetch = (options = {}) => {
    setOptions(options);
    setIsLoading(true);
  };

  useEffect(() => {
    if (isLoading) {
      fetch(`${baseUrl}${url}`, options)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setResponse(data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setError(err);
          setIsLoading(false);
        });
    }
  }, [isLoading]);

  return [
    {
      isLoading,
      response,
      error,
    },
    doFetch,
  ];
};
