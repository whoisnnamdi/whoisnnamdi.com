import Link from 'next/link'
import Image from 'next/image'

export default function PostPreview ({ post }) {
    return (
        <div className="">
            <Link href="[slug]" as={`/${post.slug}`}>
                <a className="flex flex-col sm:flex-row justify-between rounded-lg shadow-md sm:shadow-none transition duration-500 ease-in-out transform hover:opacity-80 mb-4">
                    <img
                        src={post.feature_image}
                        className="flex-1 sm:w-1/2 rounded-t-lg sm:rounded-l-lg sm:rounded-r-none" 
                    />
                    <div className="flex-1 px-3 py-4 sm:px-8 sm:w-1/2">
                        <h3 className="font-bold text-2xl text-gray-700 mb-4">
                            {post.title}
                        </h3>
                        <div 
                            className="text-xl text-gray-500 mb-4"
                            dangerouslySetInnerHTML={{ __html: post.excerpt }}
                        />
                        <p className="py-1 px-2 inline font-bold rounded-full text-sm text-white bg-blue-500">
                            {post.dateFormatted}
                        </p>
                    </div>
                </a>
            </Link>
        </div>
    );
}