import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Menu, Transition, Popover } from '@headlessui/react'
import { Fragment, useRef, useEffect, useState } from 'react'
import { useSubscribe } from './subscribe'

function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return <div className="w-5 h-5" />
    }

    return (
        <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg transition-colors duration-150 hover:bg-surface"
            aria-label="Toggle theme"
        >
            {theme === 'dark' ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
            )}
        </button>
    )
}

export default function Navbar({ source }) {
    const input = useRef(null)
    const subscribe = useSubscribe()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const handleSubscribe = async (e) => {
        e.preventDefault()
        await subscribe(input.current.value, "Navbar: " + source, input)
    }

    const navLinks = [
        { href: '/essays', label: 'Essays' },
        { href: '/notes', label: 'Notes' },
        { href: '/portfolio', label: 'Portfolio' },
        { href: '/talks', label: 'Talks' },
        { href: '/about-me', label: 'About' },
    ]

    return (
        <nav className="flex items-center justify-between py-6 mb-8">
            {/* Logo */}
            <Link href="/" className="font-serif text-2xl tracking-tight hover:opacity-80 transition-opacity">
                Nnamdi
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
                {navLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className="px-3 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors duration-150"
                    >
                        {link.label}
                    </Link>
                ))}

                <Popover className="relative ml-2">
                    {({ open }) => (
                        <>
                            <Popover.Button className="px-3 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors duration-150 focus:outline-none">
                                Subscribe
                            </Popover.Button>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-150"
                                enterFrom="opacity-0 translate-y-1"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 translate-y-1"
                            >
                                <Popover.Panel className="absolute right-0 z-10 mt-2 w-80 rounded-xl p-4 bg-surface border border-border shadow-xl">
                                    <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                                        <input
                                            id="email-input"
                                            name="email"
                                            placeholder="your@email.com"
                                            ref={input}
                                            type="email"
                                            required
                                            className="w-full rounded-lg px-4 py-2.5 text-sm bg-elevated border border-border focus:border-coral focus:outline-none transition-colors"
                                        />
                                        <button
                                            type="submit"
                                            className="w-full rounded-lg py-2.5 text-sm font-medium text-white bg-coral hover:opacity-90 transition-opacity"
                                        >
                                            Subscribe
                                        </button>
                                    </form>
                                </Popover.Panel>
                            </Transition>
                        </>
                    )}
                </Popover>

                <ThemeToggle />
            </div>

            {/* Mobile Navigation */}
            <div className="flex md:hidden items-center gap-2">
                <ThemeToggle />
                <Menu as="div" className="relative">
                    <Menu.Button
                        aria-label="Open menu"
                        className="p-2 rounded-lg transition-colors duration-150 hover:bg-surface"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </Menu.Button>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-150"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-xl bg-surface border border-border shadow-xl p-2 focus:outline-none">
                            {navLinks.map((link) => (
                                <Menu.Item key={link.href}>
                                    {({ active }) => (
                                        <Link
                                            href={link.href}
                                            className={`block px-3 py-2 rounded-lg text-sm ${
                                                active ? 'bg-elevated' : ''
                                            } transition-colors`}
                                        >
                                            {link.label}
                                        </Link>
                                    )}
                                </Menu.Item>
                            ))}
                            <Menu.Item>
                                {({ active }) => (
                                    <Popover className="relative">
                                        <Popover.Button className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                                            active ? 'bg-elevated' : ''
                                        } transition-colors focus:outline-none`}>
                                            Subscribe
                                        </Popover.Button>
                                        <Popover.Panel className="absolute right-0 z-10 mt-2 w-72 rounded-xl p-4 bg-surface border border-border shadow-xl">
                                            <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                                                <input
                                                    name="email-mobile"
                                                    placeholder="your@email.com"
                                                    ref={input}
                                                    type="email"
                                                    required
                                                    className="w-full rounded-lg px-4 py-2.5 text-sm bg-elevated border border-border focus:border-coral focus:outline-none transition-colors"
                                                />
                                                <button
                                                    type="submit"
                                                    className="w-full rounded-lg py-2.5 text-sm font-medium text-white bg-coral hover:opacity-90 transition-opacity"
                                                >
                                                    Subscribe
                                                </button>
                                            </form>
                                        </Popover.Panel>
                                    </Popover>
                                )}
                            </Menu.Item>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </nav>
    )
}
