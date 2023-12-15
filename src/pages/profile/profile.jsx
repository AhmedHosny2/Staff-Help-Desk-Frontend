import ProfileComponent from './components/profile';

export default function Profile({ setProfilePic }) {
	return (
		<>
			<ProfileComponent setProfilePic={setProfilePic} />
		</>
	);
}
