import { ReactNode } from "react";

export interface Drive {
  name: string;
  disk_type: string;
  mount_point: string;
  total_space: number | string;
  available_space: number | string;
}

interface Media {
  baseUrl: string;
}

export interface PhotoBoxProps {
  media: Media;
}

export interface NewLayoutProps {
  children: ReactNode;
}

type SelectedType = "directory" | "file" | "empty-space";

export interface RightClickContextMenuProps {
  anchorPoint: { x: number; y: number };
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  path: string;
  selectedType: SelectedType;
  entryPath: string;
  name: string;
}

interface SubMenuEntry {
  name: string;
  mount_point: string;
  icon?: React.ReactNode;
}

export interface SideBarMenuProps {
  name: string;
  subMenu?: SubMenuEntry[];
  icon?: React.ReactNode;
}

export interface UserInfo {
  name?: string;
  email?: string;
  picture?: string;
}

export interface GoogleUserProfile {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
}

export interface GoogleAlbum {
  id: string;
  title: string;
  productUrl: string;
  mediaItemsCount: string;
  coverPhotoBaseUrl: string;
  coverPhotoMediaItemId: string;
}

export interface GoogleMediaItem {
  id: string;
  productUrl: string;
  baseUrl: string;
  mimeType: string;
  filename: string;
}
