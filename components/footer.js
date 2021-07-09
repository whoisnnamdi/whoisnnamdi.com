import Image from 'next/image'
import twitter from '../public/images/twitter.svg'
import linkedin from '../public/images/linkedin.svg'
import github from '../public/images/github.svg'

const sumo = `
    <script async>(function(s,u,m,o,j,v){j=u.createElement(m);v=u.getElementsByTagName(m)[0];j.async=1;j.src=o;j.dataset.sumoSiteId='1faf02ea2882c9344411237c16fc052441e2f8d9f5bbfb6ebcd511ec85827585';v.parentNode.insertBefore(j,v)})(window,document,'script','//load.sumo.com/');</script>
`

export default function Footer() {
    return (
        <div className="mt-8">
            <div className="flex flex-row justify-center">
                <a href="https://twitter.com/whoisnnamdi" className="transition duration-500 ease-in-out mx-5 py-1 hover:opacity-80">
                    <Image 
                        src={twitter}
                        height={45}
                        width={45}
                        alt="Twitter"
                    />
                </a>
                <a href="https://www.linkedin.com/in/nnamdiiregbulem/" className="transition duration-500 ease-in-out mx-5 -mt-0.5 py-1 hover:opacity-80">
                    <Image 
                        src={linkedin}
                        height={45}
                        width={45}
                        alt="LinkedIn"
                    />
                </a>
                <a href="https://github.com/whoisnnamdi/" className="transition duration-500 ease-in-out mx-5 py-1 hover:opacity-80">
                    <Image 
                        src={github}
                        height={45}
                        width={45}
                        alt="GitHub"
                    />
                </a>
            </div>
            <div
                dangerouslySetInnerHTML={{ __html: sumo }}
            />
        </div>
    )
}