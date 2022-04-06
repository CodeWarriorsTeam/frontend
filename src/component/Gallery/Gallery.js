import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "./Gallery.css";
import { setImages } from "../../reducer/image";

const Gallery = () => {
  const state = useSelector((state) => {
    return {
      images: state.imagesReducer.images,
      token: state.loginReducer.token,
    };
  });

  const dispatch = useDispatch();

  const [gallery, setGallery] = useState([]);

  const getAllImage = async () => {
    try {
      const res = await axios.get(
        `https://safe-houseforyou.herokuapp.com/gallery
     `,
        { headers: { Authorization: `Bearer ${state.token}` } }
      );

      if (res.data.success) {
        dispatch(setImages(res.data.result));
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllImage();
  }, []);
  return (
    <>
      <div className="gallery">
        {state.images &&
          state.images.map((element) => (
            <>
              <div className="image_1">
                <img src={element.image_1} />
              </div>
            </>
          ))}
      </div>
    </>
  );
};

export default Gallery;
