import React from 'react';
import BrandsSlider from '../../../components/Main/BrandsSlider';
import ProjectsSlider from '../../../components/Main/ProjectsSlider';
import News from '../../../components/Main/News';
import VideosSlider from '../../../components/Main/VideosSlider';
import Carousel from '../../../components/Main/Carousel';
import Map from '../../../components/Main/Map';

export const Main: React.FC = () => {
  return (
    <>
      <Carousel />
      <BrandsSlider />
      <ProjectsSlider />
      <News />
      {/* <VideosSlider /> */}
      <Map />
    </>
  );
};

export default Main;
