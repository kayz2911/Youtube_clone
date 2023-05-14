import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Wrapper,
  Close,
  Title,
  Input,
  Description,
  CheckboxGroup,
  CheckboxOption,
  Button,
  Label,
} from "./UploadModalStyled";
import { isNotEmpty } from "../../../validator/Validator";
import LoadingSpinner from "../../Loading/LoadingSpinner";
import useInput from "../../../hooks/useInput";
import useUploadFile from "../../../hooks/useUploadFile";
import useBackendApi from "../../../hooks/useBackendApi";

const UploadModal = (props) => {
  const backendApi = useBackendApi();
  const navigate = useNavigate();
  const [img, setImg] = useState(null);
  const [video, setVideo] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    value: titleValue,
    isValid: titleIsValid,
    hasError: titleHasError,
    valueChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
    reset: resetTitle,
  } = useInput(isNotEmpty);

  const {
    value: descValue,
    isValid: descIsValid,
    hasError: descHasError,
    valueChangeHandler: descChangeHandler,
    inputBlurHandler: descBlurHandler,
    reset: resetDesc,
  } = useInput(isNotEmpty);

  let formIsValid = false;
  if (titleIsValid && descIsValid) {
    formIsValid = true;
  }

  const {
    error: videoError,
    downloadURL: videoSrc,
    uploadFile: uploadVideoFirebase,
  } = useUploadFile();

  const {
    error: imgError,
    downloadURL: imgSrc,
    uploadFile: uploadImgFirebase,
  } = useUploadFile();

  const handleImgFileChange = (e) => {
    setImg(e.target.files[0]);
  };

  const handleVideoFileChange = (e) => {
    const maxSize = 50 * 1024 * 1024; // 10MB
    const minWidth = 795;
    const file = e.target.files[0];
    if (file.size > maxSize) {
      setVideo(null);
    }
    const video = document.createElement("video");
    video.src = URL.createObjectURL(file);
    video.onloadedmetadata = () => {
      if (video.videoWidth < minWidth) {
        setVideo(null);
      }else {
        setVideo(e.target.files[0]);
      }
    }
  };

  const handleTagChange = (event) => {
    const tagName = event.target.name;
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedTags([...selectedTags, tagName]);
    } else {
      setSelectedTags(selectedTags.filter((tag) => tag !== tagName));
    }
  };

  const uploadVideo = useCallback(async () => {
    if (videoError || imgError) {
      return;
    }

    try {
      const res = await backendApi.addVideo({
        title: titleValue,
        desc: descValue,
        videoUrl: videoSrc,
        imgUrl: imgSrc,
        tags: selectedTags,
      });
      if (res.status === 201) {
        resetTitle();
        resetDesc();
        props.setShowUploadVideoModal(false);
        navigate(`video/${res.data._id}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [
    videoError,
    imgError,
    backendApi,
    titleValue,
    descValue,
    videoSrc,
    imgSrc,
    selectedTags,
    resetTitle,
    resetDesc,
    props,
    navigate,
  ]);

  const handleUploadVideo = async (e) => {
    e.preventDefault();
    if (!titleIsValid || !descIsValid || !video || !img) {
      return;
    }

    setLoading(true);
    await Promise.all([
      uploadVideoFirebase(video, "videos/"),
      uploadImgFirebase(img, "images/videoImg/")
    ]).catch(error => {
      console.log("Error upload on firebase");
      setLoading(false);
    });
    
  };

  useEffect(() => {
    // Only execute if both downloadURL values are available
    if (videoSrc && imgSrc) {
      uploadVideo();
    }
  }, [videoSrc, imgSrc, uploadVideo]);

  if(loading) {
    return <LoadingSpinner />
  }

  return (
    <Container>
      <Wrapper>
        <Close
          onClick={() =>
            props.setShowUploadVideoModal
              ? props.setShowUploadVideoModal(false)
              : null
          }
        >
          X
        </Close>
        <Title>Upload a New Video</Title>
        <Label>Video:</Label>
        <Input type="file" accept="video/*" onChange={handleVideoFileChange} />
        {videoError ? <p>Upload video failed</p> : null}

        <Input
          type="text"
          placeholder={titleHasError ? "Please enter title" : "Title"}
          value={titleValue}
          onChange={titleChangeHandler}
          onBlur={titleBlurHandler}
          style={titleHasError ? { borderColor: "red" } : null}
        />

        <Description
          placeholder={
            titleHasError ? "Please enter description" : "Description"
          }
          rows={8}
          value={descValue}
          onChange={descChangeHandler}
          onBlur={descBlurHandler}
          style={descHasError ? { borderColor: "red" } : null}
        />

        <Label htmlFor="tags">Tags:</Label>
        <CheckboxGroup>
          <CheckboxOption>
            <input
              type="checkbox"
              name="music"
              checked={selectedTags.includes("music")}
              onChange={handleTagChange}
            />
            <span></span>
            Music
          </CheckboxOption>
          <CheckboxOption>
            <input
              type="checkbox"
              name="sports"
              checked={selectedTags.includes("sports")}
              onChange={handleTagChange}
            />
            <span></span>
            Sports
          </CheckboxOption>
          <CheckboxOption>
            <input
              type="checkbox"
              name="gaming"
              checked={selectedTags.includes("gaming")}
              onChange={handleTagChange}
            />
            <span></span>
            Gaming
          </CheckboxOption>
          <CheckboxOption>
            <input
              type="checkbox"
              name="movie"
              checked={selectedTags.includes("movie")}
              onChange={handleTagChange}
            />
            <span></span>
            Movie
          </CheckboxOption>
          <CheckboxOption>
            <input
              type="checkbox"
              name="news"
              checked={selectedTags.includes("news")}
              onChange={handleTagChange}
            />
            <span></span>
            News
          </CheckboxOption>
        </CheckboxGroup>

        <Label>Image:</Label>
        <Input type="file" accept="image/*" onChange={handleImgFileChange} />
        {imgError ? <p>Upload image failed</p> : null}
        <Button onClick={handleUploadVideo} disabled={!formIsValid}>
          Upload
        </Button>
      </Wrapper>
    </Container>
  );
};

export default UploadModal;
