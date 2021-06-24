import Link from 'next/link'
import { Menu, Transition } from '@headlessui/react'
import { Fragment, useRef } from 'react'
import { ChevronDownIcon } from '@heroicons/react/solid'

export default function Navbar() {
    return (
        <div className="flex justify-end mb-5">
            <div className="hidden md:block px-2 pt-2 pb-3 space-y-1">
                <Link href="/">
                    <a className="px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                        Home
                    </a>
                </Link>
                <Link href="/about-me">
                    <a className="px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                        About Me
                    </a>
                </Link>
                <Link href="/portfolio">
                    <a className="px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                        Portfolio
                    </a>
                </Link>
                <Link href="/talks">
                    <a className="px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                        Talks
                    </a>
                </Link>
                <Link href="/the-developer-productivity-flywheel">
                    <a className="px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                        The Developer Productivity Manifesto
                    </a>
                </Link>                 
            </div>
            <button className="max-h-10 transition duration-500 ease-in-out rounded-md py-2 px-4 text-white font-semibold bg-blue-500 shadow-md hover:bg-blue-400 focus:outline-none">
                Subscribe
            </button>
            <Menu as="div" className="md:hidden relative inline-block text-left ml-3">
                <Menu.Button className="transition duration-500 ease-in-out inline-flex justify-center py-2 px-4 text-white font-semibold bg-gray-900 hover:bg-gray-500 shadow-md rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
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
                    <Menu.Items className="absolute mt-4 w-64 right-0 origin-top-right bg-gray-100 rounded-lg shadow-lg">
                        <Menu.Item>
                            {({ active }) => (
                                <Link href="/">
                                    <a className="block px-3 py-2 rounded-md text-lg font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                                        Home
                                    </a>
                                </Link>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <Link href="/about-me">
                                    <a className="block px-3 py-2 rounded-md text-lg font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                                        About Me
                                    </a>
                                </Link>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <Link href="/portfolio">
                                    <a className="block px-3 py-2 rounded-md text-lg font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                                        Portfolio
                                    </a>
                                </Link>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <Link href="/talks">
                                    <a className="block px-3 py-2 rounded-md text-lg font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                                        Talks
                                    </a>
                                </Link>   
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <Link href="/the-developer-productivity-flywheel">
                                    <a className="block px-3 py-2 rounded-md text-lg font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                                        The Developer Productivity Manifesto
                                    </a>
                                </Link>   
                            )}
                        </Menu.Item>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}