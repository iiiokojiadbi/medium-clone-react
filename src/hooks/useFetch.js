import {useState, useEffect, useCallback} from 'react';

export default (url) => {
  const baseUrl = 'https://conduit.productionready.io/api';
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState({});

  const doFetch = useCallback((options = {}) => {
    setOptions(options);
    setIsLoading(true);
  }, []);

  useEffect(() => {
    let skipGetResponseAfterDestroy = false;

    if (isLoading) {
      fetch(baseUrl + url, options)
        .then((response) =>
          response.json().then((data) => ({status: response.status, data}))
        )
        .then(({status, data}) => {
          if (!skipGetResponseAfterDestroy) {
            if (status === 200) {
              setResponse(data);
            } else {
              setError(data);
            }
            setIsLoading(false);
          }
        })
        .catch((err) => {
          if (!skipGetResponseAfterDestroy) {
            setError(err);
            setIsLoading(false);
          }
        });
    }

    return () => {
      skipGetResponseAfterDestroy = true;
    };
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
