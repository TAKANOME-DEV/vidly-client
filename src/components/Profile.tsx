import { useContext, useState } from "react";
import { Context } from "../context/GlobalContext";
import Wrapper from "./common/Wrapper";
import EditProfile from "./EditProfile";
import Container from "./styles/Profile.styled";

const Profile = () => {
	const [editProfile, setEditProfile] = useState(false);
	const { user } = useContext(Context);

	return (
		<>
			<EditProfile editProfile={editProfile} setEditProfile={setEditProfile} />
			<Wrapper width="100%">
				<Container>
					<div className="profile-wrapper">
						<div className="avatar-container">
							<div className="avatar">
								<div className="user-avatar flex">
									<img src={user.imageUrl} alt="User avatar" />
								</div>
								<div className="user-info">
									<p className="name">{user.name}</p>
									<p className="email">{user.email}</p>
								</div>
							</div>
							<button
								className="btn secondary btn-1"
								onClick={() => setEditProfile(true)}
							>
								Edit profile
							</button>
						</div>
						<fieldset disabled>
							<div className="input-container">
								<label htmlFor="name">Name</label>
								<input readOnly id="name" type="text" value={user.name} />
							</div>
							<div className="input-container">
								<label htmlFor="email">Email</label>
								<input readOnly id="email" type="email" value={user.email} />
							</div>
						</fieldset>
						<button className="btn secondary btn-2">Edit profile</button>
					</div>
					<div className="password-wrapper">
						<div className="password-label">
							<p>Password</p>
							<button className="btn secondary btn-1">Update password</button>
						</div>
						<input
							id="name"
							type="text"
							value="********************"
							readOnly
							disabled
						/>
						<button className="btn secondary btn-2">Update password</button>
					</div>
				</Container>
			</Wrapper>
		</>
	);
};

export default Profile;
