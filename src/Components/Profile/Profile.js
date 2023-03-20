import React from "react";
import './Profile.css';
const Profile = () =>
{
    return (
        <div className="profile">
            <h2 style={{paddingTop: '50px', textAlign: 'center'}}>Profile</h2>
            <div className="container mt-5">
		    <div className="row justify-content-center" style={{marginTop:'-30px'}}>
			    <div className="col-md-6">
				    <form>
					    <div className="form-group">
						    <label for="username">Username:</label>
						    <input type="text" className="form-control" id="username"></input>
					    </div>
					    <div className="form-group">
						    <label for="password">Password:</label>
						    <input type="password" className="form-control" id="password"></input>
					    </div>
					    <div className="form-group">
						    <label for="email">Email:</label>
						    <input type="email" className="form-control" id="email"></input>
					    </div>
					    <div className="form-group">
						    <label for="mobile">Mobile:</label>
						    <input type="text" className="form-control" id="mobile"></input>
					    </div>
					    <div className="form-group">
						    <label for="address">Address:</label>
						    <textarea className="form-control" id="address"></textarea>
					    </div>
					    <div className="form-group d-flex justify-content-center align-items-center" style={{marginTop:'10px'}}>
						    <button type="submit" className="btn btn-primary" style={{marginRight:'10px'}}>Save</button>
						    <button type="button" className="btn btn-secondary" data-dismiss="modal" style={{marginLeft:'10px'}}>Cancel</button>
					    </div>
				    </form>
			    </div>
		    </div>
	    </div>
        </div>
       
    );
}
export default Profile;