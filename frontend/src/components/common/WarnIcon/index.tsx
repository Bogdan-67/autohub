import React, { useState } from 'react';
import { PiWarningFill } from 'react-icons/pi';
import styles from './WarnIcon.module.scss';

type Props = {
  title: string;
};

const WarnIcon = ({ title }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className={styles.warn}>
      <PiWarningFill className={styles.warn__icon} />
      {isOpen && <div className={styles.warn__title}>{title}</div>}
    </div>
  );
};

export default WarnIcon;
