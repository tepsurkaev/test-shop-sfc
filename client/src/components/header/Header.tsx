import React from 'react';
import UnauthorizedHeader from './UnauthorizedHeader';
import AuthorizedUser from './AuthorizedUser';
import AuthorizedAdmin from './AuthorizedAdmin';
import { useSelector } from 'react-redux';

export default function Header() {
  const role = useSelector((state) => state.user.role);
  const token = useSelector((state) => state.user.token);

  if (token && role === 'user') {
    return (
      <div>
        <AuthorizedUser />
      </div>
    );
  } else if (token && role === 'admin') {
    return (
      <div>
        <AuthorizedAdmin />
      </div>
    );
  } else if (!token) {
    return (
      <div>
        <UnauthorizedHeader />
      </div>
    );
  }
}
