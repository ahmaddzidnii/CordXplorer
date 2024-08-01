"use client";
import { data } from "@/example/dumy";
import { useVideo } from "@/hooks/use-video";
import { useRef } from "react";

export const ChordPage = () => {
  const { played, autoScroll } = useVideo();
  const tolerance = 0.2;

  const highlightedRef = useRef<HTMLDivElement>(null);

  const scrollToHighlighted = () => {
    setTimeout(() => {
      if (highlightedRef.current) {
        highlightedRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 100);
  };

  return (
    <div className="my-5">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi quae possimus praesentium sint
      aut sequi at corporis? Quasi quos facilis, iste consectetur, error maiores porro libero earum
      a culpa fugit. Quae in esse minima dolorem sunt! Nisi, praesentium porro! Natus voluptate
      odio, pariatur expedita dolor quam facilis! Accusamus expedita maxime adipisci omnis velit
      libero, quod totam saepe quis sunt eius. Mollitia porro laborum temporibus et velit asperiores
      doloremque nulla laboriosam sed, accusantium magni. In voluptatem qui provident voluptates
      praesentium ut consectetur fuga perspiciatis veniam nesciunt! Sint dolorum perspiciatis dicta
      veritatis voluptatibus beatae animi minus debitis ex quasi quisquam, praesentium explicabo
      voluptatum recusandae provident nobis sed ipsum. Vel placeat ullam, suscipit doloremque
      veritatis cum harum exercitationem, facilis, blanditiis repellat dolore minus voluptates.
      Necessitatibus, odit obcaecati cum omnis, commodi sequi unde doloribus, cupiditate fugiat
      molestias similique. Et itaque laboriosam labore reiciendis, veritatis cumque officia
      explicabo debitis aspernatur! Quaerat cupiditate labore rerum voluptas delectus explicabo
      ratione error eos repudiandae, maxime laudantium est quasi porro veritatis atque fugit
      temporibus sunt. Quos quia rem perspiciatis rerum dolorem praesentium distinctio minus ea.
      Cupiditate voluptatem, modi veritatis veniam quia possimus fugit ullam porro quas, doloribus
      repellendus odio delectus quisquam eveniet sapiente culpa ipsum aliquid fugiat! Sed
      consequatur vitae quis tenetur sit! Ratione vero sit iste expedita? Dolorum voluptatem, minima
      dolore in accusantium temporibus. Vero, autem eius pariatur consequuntur possimus sequi harum
      eos laudantium animi assumenda veniam provident est ab optio nostrum dicta sint voluptatibus
      repudiandae blanditiis architecto! Quia totam nisi eaque quod, ipsam modi accusantium nostrum
      soluta repellendus odio aspernatur recusandae magni incidunt. Doloribus maiores, laboriosam
      minima repellat blanditiis debitis eligendi delectus facilis culpa voluptatibus alias dolor
      quos cupiditate iusto quia accusamus illo vitae facere dignissimos velit fugiat corrupti
      molestias deleniti. Qui, laboriosam aspernatur? Quos amet distinctio ipsum aperiam animi neque
      consequuntur sequi autem incidunt illum consequatur, mollitia velit nulla numquam. Similique
      numquam beatae unde mollitia corrupti, non laborum quasi perspiciatis adipisci fugit
      obcaecati, veniam nemo. Sed ducimus quia magnam excepturi possimus suscipit sequi ipsam facere
      ex. Perspiciatis quas necessitatibus esse sunt laboriosam aliquam reiciendis aliquid nihil
      quidem dignissimos odio, ducimus adipisci commodi dicta animi modi dolore et labore provident.
      Molestias itaque optio iure voluptatum dicta explicabo nesciunt? Similique, voluptate. Illo
      esse praesentium ex numquam, vel, alias labore accusantium soluta veritatis dolores quis sed
      laborum beatae recusandae doloremque officia eligendi magni distinctio voluptate. Magnam eaque
      recusandae, eveniet ipsum est fugit facere laborum atque quod suscipit nisi optio laudantium
      hic eligendi debitis sequi. Molestiae pariatur, tempora deserunt perspiciatis quo illum
      necessitatibus porro praesentium quasi corporis obcaecati cupiditate voluptatum vitae ea nisi.
      Fugit sed iusto veritatis perspiciatis aut amet, et ipsam eaque numquam autem repellendus
      sint, suscipit illum, provident placeat odio ut. Voluptates, at! Fugiat eveniet provident
      neque esse delectus vitae alias necessitatibus doloribus voluptas explicabo similique
      inventore unde eligendi mollitia maxime, nam omnis eos atque corporis dicta? Vel, eius
      architecto modi odit veritatis dolore aliquam unde molestias cum, officia doloribus expedita
      reiciendis impedit ipsum quas dolorum error maxime harum praesentium ab eos dignissimos sequi
      natus. Hic debitis eos perferendis itaque ipsam deleniti corporis repudiandae laborum quisquam
      labore quis quam, nemo nobis nostrum? Magni pariatur autem et omnis, animi doloremque ipsam
      facere, odio beatae quisquam error consectetur sit sunt ab quam expedita reiciendis? Molestias
      laudantium iure veritatis magni, magnam, recusandae minus deleniti ex aut sint natus commodi
      quos minima laboriosam facere deserunt itaque adipisci! Optio impedit asperiores eos ex ipsum
      quod voluptas corporis atque ullam natus dignissimos suscipit, unde dicta consequatur dolore
      error. Molestias placeat totam possimus sit, debitis nemo quibusdam, hic veniam numquam iusto
      minima at fugiat nostrum. Obcaecati, tenetur similique error eius repellendus facilis deserunt
      minus aliquam iure quas hic qui pariatur accusamus temporibus eligendi eum beatae, quibusdam
      cumque libero! Fugiat, doloremque ipsum, eius consectetur quod at, doloribus placeat quo
      possimus repellat optio. Aut unde, facere incidunt vel provident similique saepe vero, magnam
      inventore eius et beatae non officia, accusamus voluptates quam quisquam eveniet laudantium
      dolores ut quo? Maiores debitis nobis quam voluptas, magnam maxime repellendus eaque quisquam,
      similique culpa odit dignissimos? Adipisci nemo repellendus odit veniam doloribus aliquam quam
      porro unde quisquam temporibus expedita blanditiis harum eveniet, dolor eligendi magnam
      asperiores fugiat est amet dicta, itaque officia nam doloremque quia? Quod dicta perspiciatis
      ullam minima, illo rerum corporis alias a necessitatibus inventore aliquam quam est, libero
      quis laudantium nobis amet iure similique magni praesentium fugiat sequi rem voluptate.
      Accusantium saepe eum nam, vel ut animi delectus commodi voluptates laborum in consequatur
      neque quia qui necessitatibus enim repellat dolore itaque dolores hic blanditiis ratione nobis
      ipsa soluta. Quasi unde, saepe, sint assumenda quam animi odit nisi vitae nam quos fugit sunt
      voluptatibus iste. Pariatur dolor laborum ipsa consectetur, sunt mollitia sapiente inventore
      voluptates, beatae ipsam omnis tenetur! Minus consequuntur ullam necessitatibus. Nostrum aut
      quo quod maxime et praesentium sapiente aperiam, accusantium provident, laborum non assumenda
      enim perspiciatis quidem voluptatem debitis dignissimos eveniet eius ad. Repellat, odit facere
      esse ratione quisquam voluptate amet incidunt saepe veniam delectus ab rem facilis, iure
      deserunt cupiditate vel natus unde nisi libero perspiciatis quidem voluptas? Labore nesciunt
      dolorum odit enim cum voluptatum a ipsam blanditiis repellat rem. Sint quo architecto
      blanditiis aut, odit dolorem provident molestias molestiae, saepe aliquam autem quaerat
      nesciunt, laboriosam ad temporibus facilis. Eius quo ipsum earum mollitia itaque ipsam
      exercitationem odit aspernatur. Ullam dolorem quos aut eum fugit culpa non provident
      voluptatem sunt impedit unde tempore ab cum omnis sequi aspernatur quibusdam, blanditiis
      cumque quis? Accusamus dolor culpa odit totam veritatis, corporis laborum, minus ut voluptas,
      nulla placeat aperiam nemo deserunt. Praesentium dolorum, blanditiis voluptatum ad tenetur
      eius recusandae at rerum nemo cupiditate nihil possimus, tempora illum vitae incidunt nostrum
      aliquam perspiciatis beatae totam. Minima dignissimos incidunt error quo perspiciatis adipisci
      aut, dolore sit sunt mollitia iusto alias enim fugiat voluptas omnis quam provident accusamus
      unde expedita eum veritatis dolorem nulla nobis similique. Illum ab architecto ullam! Quidem
      libero nesciunt, assumenda enim velit quos aperiam eum tenetur? Dolorum obcaecati laborum
      corporis officiis natus consequatur non praesentium molestiae facilis velit aspernatur, unde
      quo maiores labore aliquid distinctio. Atque, vitae!
      {/* {data.sections.map((section, index) => {
        const isActive =
          played >= section.start_time - tolerance && played < section.end_time + tolerance;

        if (isActive && autoScroll) {
          scrollToHighlighted();
        }

        return (
          <div
            key={index}
            ref={isActive ? highlightedRef : null}
            className={`px-2 py-4 ${isActive ? "bg-secondary-foreground/15 rounded-sm" : ""}`}
          >
            <div>
              <strong>{section.text_uppercase}</strong>
              {section.content.map((content, index) => (
                <p
                  key={index}
                  className={`text-nowrap whitespace-nowrap ${content.margin_top ? "mt-5" : ""}`}
                  dangerouslySetInnerHTML={{ __html: content.content }}
                ></p>
              ))}
            </div>
          </div>
        );
      })} */}
    </div>
  );
};
