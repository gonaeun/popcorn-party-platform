import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import '../App.css';
import { Link } from 'react-router-dom';

function Navibar() {
  return (
    <div>
      <Navbar expand="lg" variant="dark" className="custom-navbar">
        <Container fluid>
          {/* 로고 */}
        <Navbar.Brand>
            <Link to={"/"} style={{ textDecoration: "none" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "24px",
                  fontWeight: "bold",
                  color:"rgb(112, 40, 13)",
                  marginRight: "5px", // 메뉴와 텍스트 간격
                  marginLeft: "30px" // 로고에 마진주기
                }}>
                  Popcorn Party🍿
                </span>
              </div>
            </Link>
          </Navbar.Brand>

          {/* 메뉴 추가 */}
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link as={Link} to='/' className='nav-item2'>Home</Nav.Link>
              <Nav.Link as={Link} to='/movies' className='nav-item2'>Movies</Nav.Link>
              <Nav.Link as={Link} to='/favorite' className='nav-item2'>Favorite</Nav.Link>
              <Nav.Link as={Link} to='/login' className='nav-item2'>Login</Nav.Link>
            </Nav>

            {/* 검색 */}
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-danger" style={{ marginRight: "35px" }}>Search</Button>{' '}
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Navibar;