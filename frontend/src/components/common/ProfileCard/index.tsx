import { AllHTMLAttributes } from 'react';
import styles from './ProfileCard.module.scss';

interface Props extends AllHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const ProfileCard = ({ children, className, ...props }: Props) => {
  return (
    <div className={styles.card} {...props}>
      {children}
    </div>
  );
};

export default ProfileCard;
