<ul className="nav navbar-nav navbar-right" style={{color: 'white'}}>
  <li style={{fontSize: '30px'}}>
    <Link to="/login">
      <p>MEMBER'S AREA</p>
    </Link>
  </li>
  <li style={{fontSize: '30px'}}>
    <Link to="/signup">
      <p>NOT YET MEMBER</p>
    </Link>
  </li>
</ul>


if (localStorage.getItem('token') !== null) {
  return (

    <ul className="nav navbar-nav navbar-right">
      <li>
        <button className="btn btn-danger" onClick={() => this.logout()}>
          Logout
        </button>
      </li>
    </ul>
  )



  <ul className="nav navbar-nav navbar-right">
    <li>
      <button className="btn btn-danger" onClick={() => this.logout()}>
        Logout
      </button>
    </li>
  </ul>




  <form>
    <div class="form-group">
      <label for="exampleInputEmail1">Email address</label>
      <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
      <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Password</label>
      <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
    </div>
    <div class="form-check">
      <input type="checkbox" class="form-check-input" id="exampleCheck1">
      <label class="form-check-label" for="exampleCheck1">Check me out</label>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>



  <div className="text-justify">
    <form className="form-horizontal" onSubmit={ (e) => this.logIn(e)}>
      <div className="form-group">
        <div className="col-sm-4 col-sm-offset-4">
          <input name="username" required type="text" className="form-control" id="inputUsername" placeholder="username" onChange={ (e) => this.logInInputHandler(e) } />
        </div>
      </div>
      <div className="form-group">
        <div className="col-sm-4 col-sm-offset-4">
          <input name="password" required type="password" className="form-control" id="inputPassword" placeholder="password" onChange={ (e) => this.logInInputHandler(e) } />
        </div>
      </div>
      <div className="form-group">
        <div className="col-sm-4 col-sm-offset-4">
          <button type="submit" className="btn btn-primary">Login</button>
        </div>
      </div>
    </form>
  </div>


                <input name="password" required type="password" className="form-control" id="inputPassword" placeholder="password" onChange={ (e) => this.logInInputHandler(e) } />
