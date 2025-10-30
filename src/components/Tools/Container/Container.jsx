import styles from './Container.module.scss';
import React from 'react';

export default function Container({ children, large,mobileContainer }) {
  return (
    <div className={`${styles.container} ${large ? styles.large : ''} ${mobileContainer ? styles.mobileContainer : ''}`}>
      {children}
    </div>
  );
}
