import styled from "styled-components";
import { useAuth } from "../AuthContext";
import BackButton from "../Icons/BackButton";
import ForwardButton from "../Icons/ForwardButton";
import SideBarMenu from "./SideBarMenu";
import GooglePhotosIcon from "../Icons/GooglePhotosIcon";
import DrivesIcon from "../Icons/DrivesIcon";
import HouseIcon from "../Icons/HouseIcon";
import { useNavigate } from "react-router-dom";
import { NewLayoutProps } from "../types";

const Body = styled.div`
  margin: 0;
  display: grid;
  grid-template-areas: "header header" "sidebar content";
  grid-template-rows: 60px 1fr;
  grid-template-columns: 260px 1fr;
  overflow-y: hidden;

  height: 100vh;
`;
const Sidebar = styled.div`
  grid-area: sidebar;
  background-color: gray;
  max-width: 260px;
  position: sticky;
  overflow-y: auto;
  padding: 1rem;
  top: 0;
`;

const Header = styled.header`
  gap: 10px;
  background-color: gray;
  grid-area: header;
  position: sticky;
  height: 60px;
  top: 0;
  z-index: 1000;
`;
const HeaderContent = styled.div`
  margin: 10px;
  display: flex;
  Input {
    margin: 10px;
  }
`;
const ContentArea = styled.div`
  grid-area: content;
  overflow-y: auto;
  padding: 1rem;
`;
const Input = styled.input`
  width: 50%;
`;
const SidebarMenuList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;
export default function NewLayout({ children }: NewLayoutProps) {
  const { currentPath, setCurrentPath, drives, shortcuts } = useAuth();

  const navigate = useNavigate();
  function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      navigate((event.target as HTMLInputElement).value);
    }
  }

  return (
    <>
      <Body>
        <Header>
          <HeaderContent>
            <BackButton />
            <ForwardButton />
            <Input
              value={currentPath}
              onChange={(e) => setCurrentPath(e.target.value)}
              onKeyDown={handleKeyPress}
            />
          </HeaderContent>
        </Header>
        <Sidebar>
          <SidebarMenuList>
            <SideBarMenu
              name="Web"
              subMenu={[
                {
                  name: "Google Photos",
                  mount_point: "/googlePhotos",
                  icon: <GooglePhotosIcon />,
                },
              ]}
            />
            <SideBarMenu name="Disks" subMenu={drives} icon={<DrivesIcon />} />

            <SideBarMenu
              name="Shortcuts"
              subMenu={[
                { name: "Home", mount_point: "/home", icon: <HouseIcon /> },
                ...shortcuts,
              ]}
            />
          </SidebarMenuList>
        </Sidebar>
        <ContentArea>{children}</ContentArea>
      </Body>
    </>
  );
}
