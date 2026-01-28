import Link from 'next/link'
import { useRouter } from 'next/router'
import { Popover, Menu, Transition } from '@headlessui/react'
import { Fragment, useRef } from 'react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { useSubscribe } from './subscribe'

export default function NavbarRedesign({ source }) {
    const input = useRef(null)
    const router = useRouter()
    const subscribe = useSubscribe()

    const handleSubscribe = async (e) => {
        e.preventDefault()
        await subscribe(input.current.value, "Navbar: " + source, input)
    }

    const navLinks = [
        { href: '/essays', label: 'Essays' },
        { href: '/notes', label: 'Notes' },
        { href: '/portfolio', label: 'Portfolio' },
    ]

    return (
        <nav className="flex items-center justify-between py-6 border-b border-neutral-200">
            {/* Logo */}
            <Link href="/" className="font-serif text-2xl font-bold tracking-tight text-neutral-900 hover:text-neutral-700 transition-colors">
                Nnamdi.
            </Link>

            {/* Center navigation - desktop */}
            <div className="hidden md:flex items-center gap-1">
                {navLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                            router.pathname === link.href
                                ? 'text-neutral-900 bg-neutral-100'
                                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                        }`}
                    >
                        {link.label}
                    </Link>
                ))}
            </div>

            {/* Right side - Subscribe button */}
            <div className="flex items-center gap-3">
                <Popover className="relative">
                    {({ open }) => (
                        <>
                            <Popover.Button
                                className={`${
                                    open ? 'hidden' : ''
                                } px-4 py-2 text-sm font-semibold text-white bg-accent rounded-md hover:bg-red-700 transition-colors focus:outline-none`}
                            >
                                Subscribe
                            </Popover.Button>
                            <Popover.Panel className="absolute right-0 top-full mt-2 w-72 sm:w-96 z-50">
                                <form
                                    onSubmit={handleSubscribe}
                                    className="flex flex-col sm:flex-row gap-2 p-4 bg-white rounded-lg shadow-lg border border-neutral-200"
                                >
                                    <input
                                        id="email-input"
                                        name="email"
                                        placeholder="your@email.com"
                                        ref={input}
                                        type="email"
                                        required
                                        className="flex-1 px-3 py-2 text-sm border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                    <button
                                        type="submit"
                                        className="px-4 py-2 text-sm font-semibold text-white bg-primary rounded-md hover:bg-blue-700 transition-colors"
                                    >
                                        Join
                                    </button>
                                </form>
                            </Popover.Panel>
                        </>
                    )}
                </Popover>

                {/* Mobile menu */}
                <Menu as="div" className="relative md:hidden">
                    <Menu.Button
                        aria-label="Open Menu"
                        className="p-2 text-neutral-900 bg-neutral-100 rounded-md hover:bg-neutral-200 transition-colors focus:outline-none"
                    >
                        <ChevronDownIcon className="w-5 h-5" aria-hidden="true" />
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
                        <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white rounded-lg shadow-lg border border-neutral-200 py-1 z-50">
                            {[{ href: '/', label: 'Home' }, ...navLinks, { href: '/about-me', label: 'About' }, { href: '/talks', label: 'Talks' }].map((link) => (
                                <Menu.Item key={link.href}>
                                    {({ active }) => (
                                        <Link
                                            href={link.href}
                                            className={`block px-4 py-2 text-sm ${
                                                active ? 'bg-neutral-50 text-neutral-900' : 'text-neutral-700'
                                            }`}
                                        >
                                            {link.label}
                                        </Link>
                                    )}
                                </Menu.Item>
                            ))}
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </nav>
    )
}
