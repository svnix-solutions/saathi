/**
 * Compatibility barrel. The admin shell was split into folders (see docs/ARCHITECTURE.md, admin section):
 *   ui/          design system (Icon, Avatar, Tag, Button, Kpi, Table, Modal, …)   import from './ui'
 *   navigation/  Section, PageDef, PageMap, menu, router
 *   session/     Role, roleSections, useAdmin
 *   layout/      Sidebar, TopBar, AdminLayout
 *   App.tsx      AdminApp
 * Every name this file exported before is still exported here with the same props, so existing pages keep working.
 * New code should import from the folders above.
 */
import './styles/admin.css';

export { Sprite, I, Mark, type IconName } from './ui/Icon';
export { Av } from './ui/Avatar';
export { Tag, type TagTone } from './ui/Tag';
export { Toggle } from './ui/Toggle';
export { Check } from './ui/Check';
export { Kpi } from './ui/Kpi';
export { PageHead } from './ui/PageHead';
export { Tabs } from './ui/Tabs';
export { Pager } from './ui/Pager';
export { Bar } from './ui/Bar';
export { Modal } from './ui/Modal';

export { menu, type Section, type PageDef, type PageMap } from './navigation';
export { roleSections, useAdmin, type Role } from './session';
export { AdminApp } from './App';
