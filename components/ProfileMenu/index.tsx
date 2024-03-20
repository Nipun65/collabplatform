import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

interface ProfileMenuProps {
  session: Session | null;
  setShowMenu: Dispatch<SetStateAction<boolean>>;
}
const ProfileMenu: React.FC<ProfileMenuProps> = ({ session, setShowMenu }) => {
  const router = useRouter();
  return (
    <div
      className="absolute border top-12 right-1 bg-white shadow rounded-sm z-[100]"
      onMouseDown={(e) => e.stopPropagation()}
    >
      <div className="px-4 py-2">
        <div className="text-sm">
          <p>{session?.user?.name}</p>
          <p className="opacity-70">{session?.user?.email}</p>
        </div>
      </div>
      <div className="w-full border mt-2" />
      <p
        className="text-center hover:bg-slate-200 w-full transition ease-in-out cursor-pointer duration-150 px-4 py-1"
        onClick={() => {
          signOut({ callbackUrl: "/login" });
        }}
      >
        Logout
      </p>
    </div>
  );
};
export default ProfileMenu;
