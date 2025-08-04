import { MenuItem } from './menuItem';

export interface MenuSection {
  label: string;
  color: string;
  items: MenuItem[];
}
