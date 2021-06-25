import Link from 'next/link'
import Image from 'next/image'

export default function PostPreview ({ post }) {
    return (
        <div className="">
            <Link href="[slug]" as={`/${post.slug}`}>
                <a className="flex flex-col md:flex-row justify-between rounded-xl shadow-md md:shadow-none transition duration-500 ease-in-out transform hover:opacity-80 mb-4">
                    <img
                        src={post.feature_image}
                        className="flex-1 md:w-1/2 rounded-t-xl md:rounded-l-xl md:rounded-r-none" 
                    />
                    <div className="flex flex-col items-start place-content-center flex-1 px-3 py-4 md:px-8 md:w-1/2 context-center">
                        <h3 className="font-bold text-xl text-gray-700 mb-4">
                            {post.title}
                        </h3>
                        <div 
                            className="text-lg text-gray-500 mb-4"
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