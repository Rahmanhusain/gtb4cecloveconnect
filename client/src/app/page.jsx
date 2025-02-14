import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div>

      <div className="flex sm:flex md:flex-row flex-col-reverse sm:px-32 px-10 items-center justify-between min-h-[calc(100dvh-4.6rem)] sm:py-24 py-10">
        <div className="md:w-1/2 w-full h-full text-left">
          <h1 className="sm:text-6xl text-5xl cookie my-6">Find You Date</h1>
          <p className="courgette my-2 mb-6 sm:text-sm text-xs w-full">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus officiis inventore eaque repudiandae obcaecati itaque molestias dolore iusto blanditiis molestiae cum nisi laudantium fugit, eveniet asperiores minus cumque expedita sint! Quos, atque animi. Rerum, sapiente quia debitis, ipsa nam dolores quisquam aperiam odit alias et, recusandae nemo incidunt exercitationem enim!</p>
          <Link href="/match" className="rounded-lg border-2 border-[#ff006a] p-2 px-6 cookie text-xl courgette">find your Date</Link>
          <Link href="/register" className="rounded-lg border-2 border-[#ff006a] p-2 px-6 cookie text-xl ml-3 courgette">Sign Up</Link>
        </div>
        <div className="md:w-[400px] sm:w-[300px] w-[300px] h-auto flex items-center justify-center">
          <Image src="/image.png" alt="couple heart image" width={500} height={500} className="w-full"/>
        </div>
      </div>

      <div className="h-full pb-32">
        <h1 className="sm:text-6xl text-5xl px-10 cookie my-6 text-center">Privacy Policies</h1>
        <p className="sm:w-full md:w-2/3 w-full px-10 text-justify text-sm m-auto sm:text-center courgette tracking-wider ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, sit? Aut sapiente et adipisci repudiandae ad, ratione error quia, minima, nesciunt quas eaque voluptatem. Ducimus incidunt eaque labore autem accusantium alias, ab ipsum eius numquam quis pariatur dolores mollitia. Praesentium non magni facere earum accusantium neque cum, deserunt similique consectetur obcaecati qui veniam laborum aut voluptate sit aliquam animi. Necessitatibus facere asperiores laborum dicta modi voluptatum, eaque error explicabo accusantium distinctio est! Ea sint nam fugit debitis laudantium! Temporibus, molestiae at aspernatur nam placeat consequuntur ut laboriosam quas beatae saepe aut doloremque labore. Ab mollitia quo quibusdam, voluptate eveniet perferendis!</p>
      </div>
      <div className="h-full pb-32">
        <h1 className="sm:text-6xl text-5xl px-10 cookie my-6 text-center">Terms and Conditions</h1>
        <p className="sm:w-full md:w-2/3 w-full px-10 text-justify text-sm font-extralight m-auto sm:text-center tracking-wider courgette">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, sit? Aut sapiente et adipisci repudiandae ad, ratione error quia, minima, nesciunt quas eaque voluptatem. Ducimus incidunt eaque labore autem accusantium alias, ab ipsum eius numquam quis pariatur dolores mollitia. Praesentium non magni facere earum accusantium neque cum, deserunt similique consectetur obcaecati qui veniam laborum aut voluptate sit aliquam animi. Necessitatibus facere asperiores laborum dicta modi voluptatum, eaque error explicabo accusantium distinctio est! Ea sint nam fugit debitis laudantium! Temporibus, molestiae at aspernatur nam placeat consequuntur ut laboriosam quas beatae saepe aut doloremque labore. Ab mollitia quo quibusdam, voluptate eveniet perferendis!</p>
      </div>
    
    </div>
  );
}
