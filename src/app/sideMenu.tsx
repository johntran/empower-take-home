"use client";
import { useRouter } from "next/navigation";

const menuItems = [
  { text: "Accounts", href: "/" },
  { text: "Trackers", href: "/trackers" },
];

export const SideMenu = () => {
  const router = useRouter();

  return (
    <ul className="sideMenu">
      {menuItems.map((item) => (
        <li key={`menu${item.href}`} onClick={() => router.push(item.href)}>
          {item.text}
        </li>
      ))}
    </ul>
  );
};
