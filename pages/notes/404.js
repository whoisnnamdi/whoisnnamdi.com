import Link from 'next/link'

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-xl mb-4">The note you're looking for doesn't exist.</p>
      <Link href="/notes" className="text-blue-500 hover:text-blue-700">
        Return to Notes
      </Link>
    </div>
  )
}
