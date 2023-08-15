import { FC } from 'react';
import styles from './footer.module.scss';

const Footer: FC = () => {
  return (
    <footer id='footer' className={styles.footer}>
      footer прибит к нижней части экрана
    </footer>
  );
};

export default Footer;
