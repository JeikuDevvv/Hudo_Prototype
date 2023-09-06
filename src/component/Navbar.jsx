const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          hudo
        </a>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
              />
            </li>
            <li className="nav-item ml-2">
              <button className="btn btn-outline-primary" type="button">
                <i className="bi bi-search"></i>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
