import { useAuth } from "../auth/hooks/useAuth";

import { Fragment, useState } from "react";

import { Disclosure } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

import { Dialog, Menu, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  BellIcon,
  CalendarIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'

const userNavigation = [
  { name: 'Tu cuenta', href: '#' },
  { name: 'Cerrar sesión', href: '#' },
]

const navigation = [
  { name: "Dashboard", href: "/dashboard", current: false },

  {
    name: "Administrador",
    current: false,
    children: [
      { name: "Datas", href: "/datas" },      
    ],
  },

  {
    name: "Empresa",
    current: false,
    children: [
      { name: "Empresas", href: "/empresas" },      
      { name: "Sucursales", href: "/sucursales" },      
      
      { name: "Series", href: "/series" },
    ],
  },

  {
    name: "Ventas",
    current: false,
    children: [
      { name: "Clientes", href: "/clientes" },
      { name: "Cargar clientes", href: "/clientes/procesar" },

      { name: "Grupos", href: "/cligrupos" },
      { name: "Ventas", href: "/ventas" },

    ],
  },

  {
    name: "Compras",
    current: false,
    children: [
      { name: "Proveedores", href: "/proveedores" },
      { name: "Items", href: "/items" },
      { name: "Compras", href: "#" },
    ],
  },

  {
    name: "Documentos electrónicos",
    current: false,
    children: [
      { name: "Procesar documentos recibidos", href: "/recibidas/process-documents" },
      { name: "Facturas recibidas", href: "/recibidas-facturas" },
      { name: "Facturas recibidas ver", href: "/recibidas-facturas-ver" },
      { name: "Facturas recibidas descargar pdf", href: "/recibidas-facturas-descargar" },
      { name: "Comprobantes de retención recibidos", href: "/recibidas-retenciones" },     

    ],
  },


  {
    name: "Usuarios",
    current: false,
    children: [
      { name: "Listar", href: "/usuarios" },
      { name: "Nuevo usuario", href: "/usuarios/nuevo" },
    ],
  },

  { name: "Calendario", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// open indica si esta visible el menu

export const Navbar = () => {
  const [open, setOpen] = useState(false);

  const { login, handlerLogout } = useAuth();
  return (
    <>  
    
      <div className="bg-white">
        {/* Mobile menu */}
        <Transition.Root show={open}>
          <Dialog as="div" className="relative z-40" onClose={setOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                  {/* CERRAR MENU */}
                  <div className="flex px-4 pb-2 pt-5">
                    <button
                      type="button"
                      className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                      onClick={() => setOpen(false)}
                    >
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Links */}

                  <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                {!item.children ? (
                                  <a
                                    href={item.href}
                                    className={classNames(
                                      item.current
                                        ? "bg-gray-50"
                                        : "hover:bg-gray-50",
                                      "block rounded-md py-2 pr-2 pl-10 text-sm leading-6 font-semibold text-gray-700"
                                    )}
                                  >
                                    {item.name}
                                  </a>
                                ) : (
                                  <Disclosure as="div">
                                    {({ open }) => (
                                      <>
                                        <Disclosure.Button
                                          className={classNames(
                                            item.current
                                              ? "bg-gray-50"
                                              : "hover:bg-gray-50",
                                            "flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold text-gray-700"
                                          )}
                                        >
                                          <ChevronRightIcon
                                            className={classNames(
                                              open
                                                ? "rotate-90 text-gray-500"
                                                : "text-gray-400",
                                              "h-5 w-5 shrink-0"
                                            )}
                                            aria-hidden="true"
                                          />
                                          {item.name}
                                        </Disclosure.Button>
                                        <Disclosure.Panel
                                          as="ul"
                                          className="mt-1 px-2"
                                        >
                                          {item.children.map((subItem) => (
                                            <li key={subItem.name}>
                                              <Disclosure.Button
                                                as="a"
                                                href={subItem.href}
                                                className={classNames(
                                                  subItem.current
                                                    ? "bg-gray-50"
                                                    : "hover:bg-gray-50",
                                                  "block rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-gray-700"
                                                )}
                                              >
                                                {subItem.name}
                                              </Disclosure.Button>
                                            </li>
                                          ))}
                                        </Disclosure.Panel>
                                      </>
                                    )}
                                  </Disclosure>
                                )}
                              </li>
                            ))}
                          </ul>
                        </li>

                      </ul>
              

              

              
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
        <header className="relative bg-white">
          <nav
            aria-label="Top"
            className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
          >
            <div className="border-b border-gray-200">
              <div className="flex h-16 items-center">
                {/* MOSTRAR MENU */}

                <button
                  type="button"
                  className="relative rounded-md bg-white p-2 text-gray-400"
                  onClick={() => setOpen(true)}
                >
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open menu</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Logo */}
                <div className="ml-4 flex lg:ml-0">
                  <a href="#">
                    <span className="sr-only">Your Company</span>
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                      alt=""
                    />
                  </a>
                </div>


  {/* Profile dropdown */}
  <Menu as="div" className="relative">
      <Menu.Button className="-m-1.5 flex items-center p-1.5">
        <span className="sr-only">Open user menu</span>
        <img
          className="h-8 w-8 rounded-full bg-gray-50"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
        <span className="hidden lg:flex lg:items-center">
          <span className="ml-4 text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">
          {login.user?.username}
          </span>
          <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
          {userNavigation.map((item) => (
            <Menu.Item key={item.name}>
              {({ active }) => (
                <a
                  href={item.href}
                  className={classNames(
                    active ? 'bg-gray-50' : '',
                    'block px-3 py-1 text-sm leading-6 text-gray-900'
                  )}
                >
                  {item.name}
                </a>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>

                <div className="ml-auto flex items-center">
                  <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
               
                    <button
                      onClick={handlerLogout}
                      className="btn btn-outline-success"
                    >
                      Cerrar sesión
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>

      </div>
  
    </>
  );
};

/*
        <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          {!login.isAdmin || (
            <li className="nav-item">
              <NavLink className="nav-link" to="/users/register">
                Registrar Usuario
              </NavLink>
            </li>
          )}
        </ul>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNavLogout"
        ></div>
      </div>
*/
/*

  {
    name: "Compras",
    current: false,
    children: [
      { name: "Facturas", href: "#" },
      { name: "Devoluciones", href: "#" },
      { name: "Orden de compra", href: "#" },
    ],
  },
  {
    name: "Ventas",
    current: false,
    children: [
      { name: "Facturas", href: "#" },
      { name: "Notas de credito", href: "#" },
      { name: "Guias de remision", href: "#" },
    ],
  },
*/

