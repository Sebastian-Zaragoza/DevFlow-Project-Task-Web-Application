import { Menu } from "@headlessui/react";
import {
  ChevronDownIcon,
  UserIcon,
  FolderIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";
import type { User } from "../types/auth.ts";
import { useQueryClient } from "@tanstack/react-query";

type NavMenuProps = {
  name: User["name"];
};

export default function NavMenu({ name }: NavMenuProps) {
  const queryClient = useQueryClient();

  const logout = () => {
    localStorage.removeItem("AuthDevFlow");
    queryClient.invalidateQueries({ queryKey: ["user"] });
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button
        className="
        inline-flex items-center space-x-2
        bg-white border border-gray-200 rounded-md
        px-4 py-2 text-sm font-medium text-gray-700
        hover:bg-gray-50 focus:outline-none

      "
      >
        <span>¿Qué desarrollarás hoy {name}?</span>
        <ChevronDownIcon className="w-4 h-4 text-gray-500" aria-hidden="true" />
      </Menu.Button>

      <Menu.Items
        className="
        absolute right-0 mt-2 w-48
        bg-white border border-gray-200
        rounded-md shadow-lg focus:outline-none
      "
      >
        <Menu.Item>
          {({ active }) => (
            <button
              className={`group flex items-center w-full px-4 py-2 text-sm text-gray-700 ${
                active ? "bg-gray-100" : ""
              }`}
            >
              <UserIcon className="w-5 h-5 mr-2 text-gray-500 group-hover:text-gray-700" />
              Mi Perfil
            </button>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              className={`group flex items-center w-full px-4 py-2 text-sm text-gray-700 ${
                active ? "bg-gray-100" : ""
              }`}
            >
              <FolderIcon className="w-5 h-5 mr-2 text-gray-500 group-hover:text-gray-700" />
              Mis Proyectos
            </button>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              className={`group flex items-center w-full px-4 py-2 text-sm text-blue-600 ${
                active ? "bg-gray-100" : ""
              }`}
              onClick={logout}
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2 text-blue-600 group-hover:text-blue-700" />
              Cerrar Sesión
            </button>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
}
