import React, {useState, useEffect} from 'react';

import {BackendErrorMessages} from 'components';

export const ArticleForm = ({onSubmit, errors, initialValues}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [body, setBody] = useState('');
  const [tagList, setTagList] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const article = {
      title,
      description,
      body,
      tagList: tagList.split(' '),
    };


    onSubmit(article);
  };

  useEffect(() => {
    if (!initialValues) {
      return;
    }
    setTitle(initialValues.title);
    setDescription(initialValues.description);
    setBody(initialValues.body);
    setTagList(initialValues.tagList.join(' '));
  }, [initialValues]);

  return (
    <div>
      <div>
        <div>
          <div>
            {errors && <BackendErrorMessages backendErrors={errors} />}
            <form onSubmit={handleSubmit}>
              <fieldset>
                <fieldset>
                  <input
                    type='text'
                    placeholder='Article title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </fieldset>
                <fieldset>
                  <input
                    type='text'
                    placeholder='What is this article about?'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </fieldset>
                <fieldset>
                  <textarea
                    rows='8'
                    placeholder='Write your article (in markdown)'
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                  ></textarea>
                </fieldset>
                <fieldset>
                  <input
                    type='text'
                    placeholder='Enter tags'
                    value={tagList}
                    onChange={(e) => setTagList(e.target.value)}
                  />
                </fieldset>
                <fieldset>
                  <button type='submit'>Publish Article</button>
                </fieldset>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
