import Link from 'next/link'
import Image from 'next/image'

export default function PostPreview ({ post }) {
    return (
        <div className="">
            <Link href="[slug]" as={`/${post.slug}/`}>
                <a className="flex flex-col sm:flex-row sm:max-h-64 justify-between rounded-xl transition duration-500 ease-in-out transform hover:opacity-80 mb-4 border border-black border-opacity-10">
                    <div className="relative block w-full h-44 sm:w-1/2 sm:h-56 my-auto">
                        <Image
                            src={post.feature_image}
                            alt={post.title}
                            layout="fill"
                            sizes="320px"
                            className="flex-1 sm:w-1/2 rounded-t-xl sm:rounded-l-xl sm:rounded-r-none" 
                        />
                    </div>
                    <div className="flex flex-col items-start place-content-center flex-1 px-3 py-4 sm:px-8 sm:w-1/2 content-center">
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