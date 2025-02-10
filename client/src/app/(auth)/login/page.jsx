import StoreProvider from "@/app/StoreProvider";
import Login from "@/components/Login";

export default function page() {
  return (
    <StoreProvider>
      <Login />
    </StoreProvider>
  );
}
