import { Container } from '@/components/ui/container';
import Typography from '@/components/ui/typography';
import { useUser } from '@/providers/user';
import { ChangePassword } from './components/change-password';
import { EditProfile } from './components/edit-profile';

const Profile = () => {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }
  return (
    <Container className="py-10 w-full">
      <div className="flex flex-col gap-4 w-full">
        <div className="flex justify-between">
          <Typography variant="h2" fontWeight="bold">
            My Profile
          </Typography>
        </div>

        <div className="flex justify-between border shadow-md p-4 rounded-md items-center bg-white">
          <div className="flex flex-col gap-2 ">
            <Typography variant="body1" fontWeight="bold">
              FirstName: <span className="font-normal">{user?.firstName}</span>
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              LastName: <span className="font-normal">{user?.lastName}</span>
            </Typography>
          </div>
          <div className="flex flex-col gap-2">
            <EditProfile />
            <ChangePassword />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Profile;
