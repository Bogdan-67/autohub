import {
  BsArrowReturnRight,
  BsCollectionPlay,
  BsBoxSeam,
  BsBarChartSteps,
  BsClipboardCheck,
  BsPeople,
  BsStar,
} from 'react-icons/bs';

export const SidebarItems = [
  {
    id: 1,
    title: 'Слайдеры',
    link: '/sliders',
    icon: () => {
      return <BsCollectionPlay />;
    },
    parent: null,
  },
  {
    id: 2,
    title: 'Бренды',
    link: '/brands',
    icon: () => {
      return <BsStar />;
    },
    parent: null,
  },
  {
    id: 3,
    title: 'Категории',
    link: '/categories',
    icon: () => {
      return <BsBarChartSteps />;
    },
    parent: null,
  },
  {
    id: 4,
    title: 'Товары',
    link: '/goods',
    icon: () => {
      return <BsBoxSeam />;
    },
    parent: null,
  },
  {
    id: 5,
    title: 'Пользователи',
    link: '/users',
    icon: () => {
      return <BsPeople />;
    },
    parent: null,
  },
  {
    id: 6,
    title: 'Заказы',
    link: '/orders',
    icon: () => {
      return <BsClipboardCheck />;
    },
    parent: null,
  },
  {
    id: 7,
    title: 'Главный слайдер',
    link: '/main-slider',
    icon: () => {
      return <BsArrowReturnRight />;
    },
    parent: 1,
  },
  {
    id: 8,
    title: 'Создание',
    link: '/create',
    icon: () => {
      return <BsArrowReturnRight />;
    },
    parent: 4,
  },
  {
    id: 9,
    title: 'Обратная связь',
    link: '/feedbacks',
    icon: () => {
      return <BsArrowReturnRight />;
    },
    parent: 5,
  },
];
