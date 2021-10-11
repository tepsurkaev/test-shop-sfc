import React, { useState } from 'react';
import headerModule from '../../styles/header.module.css';
import RegistrationModal from '../modals/RegistrationModal';

function UnauthorizedHeader() {
  return (
    <header className={headerModule.header}>
      <div className={headerModule.title}>Шапка сайта</div>
      <div className={headerModule.personIcon}>
        <RegistrationModal />
      </div>
    </header>
  );
}

export default UnauthorizedHeader;
