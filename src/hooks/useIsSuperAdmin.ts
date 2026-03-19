import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';

export function isSuperAdmin(role: string | undefined): boolean {
  return !!role && role.replace(/\s+/g, '').toLowerCase() === 'superadmin';
}

export function useIsSuperAdmin(): boolean {
  const { user } = useSelector((state: RootState) => state.user);
  return isSuperAdmin(user?.role);
} 