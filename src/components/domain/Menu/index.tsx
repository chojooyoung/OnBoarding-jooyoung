import styled from "@emotion/styled";
import { Link } from "react-router-dom";

function Menu() {
  return (
    <Nav>
      <MenuWrapper>
        <MenuList>
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            Home
          </Link>
        </MenuList>
        <MenuList>
          <Link to="/posts" style={{ textDecoration: "none", color: "white" }}>
            Posts
          </Link>
        </MenuList>
        <MenuList>
          <Link
            to="/write/new"
            style={{ textDecoration: "none", color: "white" }}
          >
            Write
          </Link>
        </MenuList>
      </MenuWrapper>
    </Nav>
  );
}
const Nav = styled.nav`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: #486ba2;
`;
const MenuWrapper = styled.ul`
  text-decoration: none;
  display: flex;
`;
const MenuList = styled.li`
  color: gray;
  font-size: 30px;
  list-style: none;
  padding: 10px;

  :hover {
    background-color: #d9daee;
    opacity: 0.3;
  }
`;

export default Menu;
