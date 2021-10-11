import React from 'react';
import { useSelector } from 'react-redux';
import UnauthorizedHeader from './UnauthorizedHeader';
import AuthorizedUser from './AuthorizedUser';
import AuthorizedAdmin from './AuthorizedAdmin';

function Header() {
  const role = useSelector((state) => state.user.role);
  const token = useSelector((state) => state.user.token);

  if (role && role === 'user') {
    return (
      <div>
        <AuthorizedUser />
      </div>
    );
  } else if (role && role === 'admin') {
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

export default Header;
