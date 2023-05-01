import React, { useEffect } from 'react';
import axios from 'axios';
import { UserButton, useUser } from '@clerk/clerk-react';
import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

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
  activeTab: string;
  children: React.ReactNode;
};

const NavButton = ({ href, activeTab, children }: NavButtonProps) => {
  return (
    <a
      key={href.split('/').pop()}
      href={href}
      className={classNames(
        'text-gray-900 hover:bg-gray-900 hover:text-white',
        'rounded-md px-3 py-2 text-sm font-medium',
        activeTab === href ? 'bg-gray-900 text-white' : 'text-gray-900'
      )}
    >
      {children}
    </a>
  );
};

const Navbar = () => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = React.useState('');

  useEffect(() => {
    console.log(window.location.pathname);
    setActiveTab(window.location.pathname);
  }, []);

  useEffect(() => {
    if (user) {
      axios.post('/api/user/register', {
        clerkId: user.id,
        email: user.primaryEmailAddress?.emailAddress,
      }).then((response) => {
        console.log('User created:', response.data);
      })
    }
  }, [user]);

  return (
    <Disclosure as="nav" className="bg-transparent">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <NavButton activeTab={activeTab} href='/'>
                  <b className='font-bold text-2xl'>Dream In Style</b>
                </NavButton>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    <NavButton href="/gallery" activeTab={activeTab}>Gallery</NavButton>
                    {(user
                      ? (<>
                        <NavButton href="/artist" activeTab={activeTab}>Artist</NavButton>
                        <NavButton href="/style/create" activeTab={activeTab}>Create Style</NavButton>
                      </>)
                      : <NavButton href="/signin" activeTab={activeTab}>Sign In</NavButton>
                    )}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  {/* Profile dropdown */}
                  {user && (<>
                    <UserButton /> <div className='px-5 py-2'>{user.fullName}</div>
                  </>)}

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
