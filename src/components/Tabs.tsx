import React from 'react';
import { Link } from 'react-router-dom';
import s from './Tabs.module.scss';

export default function Tabs() {
  return (
    <div className={s.container}>
      <Link to='/'>User Panel</Link>
      <Link to='/admins'>Admin Panel</Link>
    </div>
  );
}
