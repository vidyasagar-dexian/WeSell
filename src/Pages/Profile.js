import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthConsumer } from '../Context/AuthContext';
import axios from 'axios';
import Camera from '../Components/Camera';

function Profile() {
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [twitterId, setTwitterId] = useState('');
  const [bio, setBio] = useState('');
  const navigate = useNavigate();
  const [userList, setUserList] = useState(null);
  const { userId } = AuthConsumer();
  const [isFormValid, setIsFormValid] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3000/users")
      .then(response => { setUserList((response.data)) })
  }, [])

  useEffect(() => {
    if (userList) {
      const user = userList[userId];
      setPassword(user.password);
      if (user.fullName) setFullName(user.fullName);
      if (user.dob) setDob(user.dob);
      if (user.gender) setGender(user.gender);
      if (user.address) setAddress(user.address);
      if (user.twitterId) setTwitterId(user.twitterId);
      if (user.email) setEmail(user.email);
      if (user.bio) setBio(user.bio);
    }
  }, [userList])

  useEffect(() => {
    setIsFormValid(
      fullName.trim() !== '' &&
      dob.trim() !== '' &&
      gender.trim() !== '' &&
      address.trim() !== '' &&
      email.trim() !== '' &&
      twitterId.trim() !== '' &&
      bio.trim() !== ''
    );
  }, [fullName, dob, gender, address, email, twitterId, bio]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      "fullName": fullName,
      "dob": dob,
      "gender": gender,
      "address": address,
      "email": email,
      "twitterId": twitterId,
      "bio": bio,
      "password": password
    };
    const updatedUserList = { ...userList, [userId]: newUser };
    setUserList(updatedUserList);
    axios.put("http://localhost:3000/users", updatedUserList)
      .then(() => navigate("/dashboard"))
      .catch(error => console.error("Error updating user data:", error));
  }

  return (
    <div className="container mt-1">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h3 className=' text-center'>Edit Profile</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Profile Photo</label>
                  <Camera userId={userId} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input type="text" className="form-control" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Enter Full Name" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Date of Birth</label>
                  <input type="date" className="form-control" value={dob} onChange={(e) => setDob(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Gender</label>
                  <select className="form-select" value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Address</label>
                  <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter Address" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Twitter ID</label>
                  <input type="text" className="form-control" value={twitterId} onChange={(e) => setTwitterId(e.target.value)} placeholder="Enter Twitter ID" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Bio</label>
                  <textarea className="form-control" value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Enter Bio"></textarea>
                </div>
                <button type="submit" className="btn btn-primary" disabled={!isFormValid}>Save</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
