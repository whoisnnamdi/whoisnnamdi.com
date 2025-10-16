import Link from 'next/link'
import { useRouter } from 'next/router'
import { Menu, Transition, Popover } from '@headlessui/react'
import { Fragment, useRef } from 'react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { useSubscribe } from './subscribe'

export default function Navbar({ source }) {
    const input = useRef(null)
    const router = useRouter()
    const subscribe = useSubscribe()
    
    const handleSubscribe = async (e) => {
        e.preventDefault()
        await subscribe(input.current.value, "Navbar: " + source, input)
    }
    
    return (
        <div className="flex justify-end mb-5 overflow-hidden">
            <div className="flex-shrink-0 hidden md:block px-1 py-2 md:text-base lg:text-base font-semibold text-gray-700">
                <Link
                    href="/"
                    className="px-3 py-2 rounded-md hover:text-gray-900 hover:bg-gray-50">
                    
                        Home
                    
                </Link>
                <Link
                    href="/about-me"
                    className="px-3 py-2 rounded-md hover:text-gray-900 hover:bg-gray-50">
                    
                        About Me
                    
                </Link>
                <Link
                    href="/essays"
                    className="px-3 py-2 rounded-md hover:text-gray-900 hover:bg-gray-50">
                    
                        Essays
                    
                </Link>
                <Link
                    href="/notes"
                    className="px-3 py-2 rounded-md hover:text-gray-900 hover:bg-gray-50">
                    
                        Notes
                    
                </Link>
                <Link
                    href="/portfolio"
                    className="px-3 py-2 rounded-md hover:text-gray-900 hover:bg-gray-50">
                    
                        Portfolio
                    
                </Link>
                <Link
                    href="/talks"
                    className="px-3 py-2 rounded-md hover:text-gray-900 hover:bg-gray-50">
                    
                        Talks
                    
                </Link>                
            </div>
            <Popover>
                {({ open }) => (
                    <div className="">
                        <Popover.Button className={`${open ? "hidden" : "transition duration-500 ease-in-out rounded-md py-2 px-4 text-white font-semibold bg-blue-600 shadow-md hover:bg-blue-500 focus:outline-none"}`}>
                            Subscribe
                        </Popover.Button>
                        <Popover.Panel className="w-64 sm:w-96">
                            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-3 justify-between">
                                <input 
                                    id="email-input"
                                    name="email"
                                    placeholder="Type your email..."
                                    ref={input}
                                    type="email"
                                    required
                                    className="text-gray-500 flex-1 transition duration-500 hover:bg-gray-200 bg-gray-100 sm:w-80 rounded-md px-4 py-2 focus:ring-blue-500 focus:outline-none" />
                                <button type="submit" className="max-h-10 transition duration-500 ease-in-out rounded-md py-2 px-4 text-white font-semibold bg-blue-500 shadow-md hover:bg-blue-400 focus:outline-none">
                                    Subscribe
                                </button>
                            </form>
                        </Popover.Panel>
                    </div>
                )}
            </Popover>
            <Menu as="div" className="flex flex-col md:hidden relative text-left ml-3">
                <Menu.Button aria-label="Open Menu" className="transition duration-500 ease-in-out inline-flex justify-center py-2 px-4 text-white font-semibold bg-gray-900 hover:bg-gray-500 shadow-md rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                    <ChevronDownIcon
                        className="w-5 h-5 py-0.5"
                        aria-hidden="true"
                    />
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
                    <Menu.Items className="mt-4 w-52 right-0 origin-top-right bg-gray-100 rounded-lg shadow-lg">
                        <Menu.Item>
                            {({ active }) => (
                                <Link
                                    href="/"
                                    className="block px-3 py-2 rounded-md text-lg font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                                    
                                        Home
                                    
                                </Link>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <Link
                                    href="/about-me"
                                    className="block px-3 py-2 rounded-md text-lg font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                                    
                                        About Me
                                    
                                </Link>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <Link
                                    href="/notes"
                                    className="block px-3 py-2 rounded-md text-lg font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                                    
                                        Notes
                                    
                                </Link>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <Link
                                    href="/portfolio"
                                    className="block px-3 py-2 rounded-md text-lg font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                                    
                                        Portfolio
                                    
                                </Link>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <Link
                                    href="/talks"
                                    className="block px-3 py-2 rounded-md text-lg font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                                    
                                        Talks
                                    
                                </Link>   
                            )}
                        </Menu.Item>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
}
