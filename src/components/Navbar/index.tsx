import React, { Fragment } from 'react';
import Link from 'next/link';
import { useUser } from '@clerk/clerk-react';
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

type NavButtonProps = {
  href: string;
  children: React.ReactNode;
};

const NavButton = ({ href, children }: NavButtonProps) => {
  return (
    <a
      key={href.split('/').pop()}
      href={href}
      className={classNames(
        'text-gray-300 hover:bg-gray-700 hover:text-white',
        'rounded-md px-3 py-2 text-sm font-medium'
      )}
    // aria-current={item.current ? 'page' : undefined}
    >
      {children}
    </a>
  );
};

const Navbar = () => {
  const { user } = useUser();

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <NavButton href='/'>
                  <div className="flex-shrink-0">
                    <img
                      className="h-8 w-8"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                      alt="Ai Art Style Logo"
                    />
                  </div>
                </NavButton>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    <NavButton href="/gallery">Gallery</NavButton>
                    {(user
                      ? (<>
                        <NavButton href="/artist">Artist</NavButton>
                        <NavButton href="/style/create">Create Style</NavButton>
                      </>)
                      : <NavButton href="/signin">Sign In</NavButton>
                    )}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="sr-only">Open user menu</span>
                        <img className="h-8 w-8 rounded-full" src="https://media.discordapp.net/attachments/1037414950152437790/1100970450936402020/Liftaris_a_creative_defaultplaceholder_anonymous_profile_pictur_e72e3724-3b7a-4483-8535-93bdf28922a9.png?width=701&height=701" alt="" />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {userNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <a
                                href={item.href}
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
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
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;