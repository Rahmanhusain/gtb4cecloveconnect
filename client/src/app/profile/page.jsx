import ProfileSetting from "@/components/ProfileSetting";
import StoreProvider from "../StoreProvider";

const page = () => {
  return (
    <div className="h-full w-full">
      <div className="flex justify-center w-full cookie">
      <StoreProvider>
        <ProfileSetting />
      </StoreProvider>
      </div>
    </div>
  );
};

export default page;
