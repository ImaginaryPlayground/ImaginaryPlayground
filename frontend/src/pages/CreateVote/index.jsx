import React, { useState } from 'react';

import Layout from '../../layout/';
import { ViewContext } from '../../context/ViewContext';
import DialogActionsComponet from '../../components/Create/DialogActionsComponet/index';
import CreateVoteComponent from '../../components/Create/CreateVoteComponent/index';

const CreateVote = (props) => {
  const [nowSelectedIndex, setNowSelectedIndex] = useState(0);
  const [isMultipleChoice, setIsMultipleChoice] = useState(false);
  const [isPowerVoteChoice, setIsPowerVoteChoice] = useState(false);
  const [category, setCategory] = useState(0);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnailImageData, setThumbnailImageData] = useState({
    img: '',
  });
  const [readyToUpload, setReadyToUpload] = useState(true);

  const [data, setData] = useState([
    {
      optionTitle: '',
      targetUploadType: '',
      uploadTarget: '',
      uploadTargetPath: '',
    },
    {
      optionTitle: '',
      targetUploadType: '',
      uploadTarget: '',
      uploadTargetPath: '',
    },
  ]);
  const [endDt, setEndDt] = useState(0);

  return (
    <Layout>
      <ViewContext.Provider
        value={{
          data,
          setData,
          nowSelectedIndex,
          setNowSelectedIndex,
          title,
          setTitle,
          thumbnailImageData,
          setThumbnailImageData,
          isMultipleChoice,
          category,
          setCategory,
          setIsMultipleChoice,
          isPowerVoteChoice,
          setIsPowerVoteChoice,
          description,
          setDescription,
          readyToUpload,
          setReadyToUpload,
          endDt,
          setEndDt,
        }}
      >
        <DialogActionsComponet props={props} />
        <h2>Create New Vote</h2>
        <CreateVoteComponent />
      </ViewContext.Provider>
    </Layout>
  );
};

export default CreateVote;
