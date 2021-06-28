import Image from 'next/image'
import twitter from '../public/images/twitter.svg'
import linkedin from '../public/images/linkedin.svg'
import github from '../public/images/github.svg'

export default function Footer() {
    return (
        <div className="mt-8">
            <div className="flex flex-row justify-center">
                <a href="https://twitter.com/whoisnnamdi" className="transition duration-500 ease-in-out mx-5 py-1 hover:opacity-80">
                    <Image 
                        src={twitter}
                        height={45}
                        width={45}
                    />
                </a>
                <a href="https://www.linkedin.com/in/nnamdiiregbulem/" className="transition duration-500 ease-in-out mx-5 -mt-0.5 py-1 hover:opacity-80">
                    <Image 
                        src={linkedin}
                        height={45}
                        width={45}
                    />
                </a>
                <a href="https://github.com/whoisnnamdi/" className="transition duration-500 ease-in-out mx-5 py-1 hover:opacity-80">
                    <Image 
                        src={github}
                        height={45}
                        width={45}
                    />
                </a>
            </div>
        </div>
    )
}