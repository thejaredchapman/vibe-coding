"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import rolesData from '@/data/roles.json';

export type Role = typeof rolesData[0];

interface RoleContextType {
  activeRole: Role;
  setActiveRole: (role: Role) => void;
  roles: Role[];
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [activeRole, setActiveRole] = useState<Role>(rolesData[0]);

  return (
    <RoleContext.Provider value={{ activeRole, setActiveRole, roles: rolesData }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
}
