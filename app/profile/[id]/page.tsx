import ProfilePage from "@/components/ProfilePage";
import { AssetsImg } from "@/public";

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <div>
      <ProfilePage
        name="John Doe"
        email="john.doe@example.com"
        walletAddress="0x1234...5678"
        dateOfBirth="1990-01-15"
        joinDate="2023-06-01"
        portfolioValue={45678.9}
        profileImage={AssetsImg.ic_hamburgerSidebar}
      />
    </div>
  );
}
