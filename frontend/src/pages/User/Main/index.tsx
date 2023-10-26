import React from 'react';
import BrandsSlider from '../../../components/Main/BrandsSlider';
import ProjectsSlider from '../../../components/Main/ProjectsSlider';
import News from '../../../components/Main/News';
import VideosSlider from '../../../components/Main/VideosSlider';
import Carousel from '../../../components/Main/Carousel';

export const Main: React.FC = () => {
  return (
    <>
      <Carousel />
      <BrandsSlider />
      <ProjectsSlider />
      <News />
      <VideosSlider />
      <iframe
        src='https://yandex.ru/map-widget/v1/?um=constructor%3Ae161cd993b0658583e22abbc725c7f7f2e8776e68412577e8305ad81d939c620&amp;source=constructor'
        width='100%'
        height='400'
        frameBorder='0'></iframe>
    </>
  );
};

export default Main;
