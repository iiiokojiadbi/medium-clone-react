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

  // const returnResponse = (response) => {
  //   if(response.ok) {
  //     return response.json();
  //   }

  //   return Promise.reject(``)
  // }

  useEffect(() => {
    if (isLoading) {
      fetch(baseUrl + url, options)
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
