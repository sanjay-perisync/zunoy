import { Avatar, AvatarGroup } from "@mui/material";

export default function ComingSoonCard() {
    return (
        <div className="bg-white p-10 rounded-lg space-y-3 border flex flex-col items-center justify-center h-auto">
            <h3 className="text-red-500 font-semibold text-xl">Coming Soon</h3>
            <p className="text-gray-600 text-center text-[18px]">
                We're cooking something special...
            </p>

            {/* Icons Section */}
            <div className="flex mt-3 items-center">
                <AvatarGroup max={5}>
                    <img
                        src="https://account.zunoy.com/images/zoopshare.svg"
                        alt="Icon 1"
                        className="w-11 h-11 rounded-full border border-gray-200 p-1 shadow-lg relative z-100"
                    />

                    <Avatar
                        alt="Travis Howard"
                        src="https://account.zunoy.com/images/zoopapi.svg"
                        sx={{
                            filter: "blur(2px)",
                            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)"
                        }}
                    />
                    <Avatar
                        alt="Cindy Baker"
                        src="https://account.zunoy.com/images/zoopshare.svg"
                        sx={{
                            filter: "blur(2px)",
                            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)"
                        }}
                    />
                    <Avatar
                        alt="Cindy Baker"
                        src="https://account.zunoy.com/images/zoopshare.svg"
                        sx={{
                            filter: "blur(2px)",
                            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)"
                        }}
                    />

                </AvatarGroup>

                <span className="ml-3 text-gray-500 font-medium text-lg">+3</span>
            </div>
        </div>
    );
}
