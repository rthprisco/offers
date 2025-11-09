import { Outlet } from "react-router-dom";

export default function CenteredLayout() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {/* <div className="w-full max-w-xl"> */}
        <Outlet />
      {/* </div> */}
    </div>
  );
}