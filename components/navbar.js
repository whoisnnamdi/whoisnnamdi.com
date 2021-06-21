import Link from 'next/link'
import { Menu, Transition } from '@headlessui/react'
import { Fragment, useRef } from 'react'
import { ChevronDownIcon } from '@heroicons/react/solid'

export default function Navbar() {
    return (
        // <div className="overflow-hidden">
        //     <div>
        //         <nav className="relative flex items-center justify-end space-x-10 mb-5 text-gray-600" aria-label="Global">
        //             <div className="flex items-center flex-grow flex-shrink-0 sm:flex-grow-0">
        //                 <div className="flex items-start justify-between w-full sm:w-auto">
        //                     <div className="-mr-2 flex items-center sm:hidden">
        //                         <button type="button" class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" aria-expanded="false">
        //                             <span class="sr-only">Open main menu</span>
        //                             <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        //                                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        //                             </svg>
        //                         </button>
        //                     </div>
        //                 </div>
        //             </div>
        //             <div className="hidden sm:block">
        //                 <Link href="/">
        //                     <a>
        //                         Home
        //                     </a>
        //                 </Link>
        //                 <Link href="/about-me">
        //                     <a>
        //                         About Me
        //                     </a>
        //                 </Link>
        //                 <Link href="/portfolio">
        //                     <a>
        //                         Portfolio
        //                     </a>
        //                 </Link>
        //                 <Link href="/talks">
        //                     <a>
        //                         Talks
        //                     </a>
        //                 </Link>
        //             </div>
        //             <button className="transition duration-500 ease-in-out rounded-md py-2 px-3 text-white font-semibold bg-blue-500 shadow-md hover:bg-blue-400 focus:outline-none">
        //                 Subscribe
        //             </button>
        //         </nav>
        //     </div>
        //     <div className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right sm:hidden">
        //         <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
        //             <div className="px-5 pt-4 flex items-center justify-between">
        //                 <div className="-mr-2">
        //                     <button type="button" className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
        //                         <span class="sr-only">Close main menu</span>
        //                         <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        //                             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        //                         </svg>
        //                     </button>
        //                 </div>
        //             </div>
        //             <div class="px-2 pt-2 pb-3 space-y-1">
        //                 <Link href="/">
        //                     <a className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
        //                         Home
        //                     </a>
        //                 </Link>
        //                 <Link href="/about-me">
        //                     <a className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
        //                         About Me
        //                     </a>
        //                 </Link>
        //                 <Link href="/portfolio">
        //                     <a className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
        //                         Portfolio
        //                     </a>
        //                 </Link>
        //                 <Link href="/talks">
        //                     <a className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
        //                         Talks
        //                     </a>
        //                 </Link>                
        //             </div>
        //         </div>
        //     </div>
        // </div>
        <div className="flex justify-end mb-5">
            <div class="hidden sm:block px-2 pt-2 pb-3 space-y-1">
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
            <Menu as="div" className="sm:hidden relative inline-block text-left ml-3">
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