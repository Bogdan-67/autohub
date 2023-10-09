import React from 'react';
import styles from './AdminLayout.module.scss';
import classNames from 'classnames';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { SidebarItems } from './SidebarLinks';

type Props = {};

export const ADMIN_PATH = '/admin';

const AdminSidebar = (props: Props) => {
  const { pathname } = useLocation();

  return (
    <section className={styles.sidebar}>
      {SidebarItems.filter((item) => item.parent === null).map((item) => (
        <>
          <Link
            key={item.id}
            to={ADMIN_PATH + item.link}
            className={classNames(styles.sidebar__item, {
              [styles.active]: pathname.includes(ADMIN_PATH + item.link),
            })}>
            <span>{item.icon()}</span>
            {item.title}
          </Link>
          {pathname.includes(ADMIN_PATH + item.link) &&
            SidebarItems.filter((child) => child.parent === item.id).map((child) => (
              <Link
                key={child.id}
                to={ADMIN_PATH + item.link + child.link}
                className={classNames(styles.sidebar__item, styles.sidebar__item__child, {
                  [styles.active]: pathname.includes(child.link),
                })}>
                {pathname.includes(child.link) && <span>{child.icon()}</span>}
                {child.title}
              </Link>
            ))}
        </>
      ))}
    </section>
  );
};

export default AdminSidebar;
