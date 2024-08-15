import { CardSong } from "@/components/card/card-song";
import { CardWrapper } from "@/components/card/card-wrapper";
import { TextHeader } from "@/components/text-header";

function SongsPage() {
  return (
    <div className="container space-y-10">
      <section>
        <TextHeader title="Japanese Song" />
        <CardWrapper>
          {Array.from({ length: 4 }).map((_, index) => (
            <CardSong
              key={index}
              imageSrc="https://www.kawaiikakkoiisugoi.com/wp-content/uploads/2020/07/YOASOBI-Tabun-620x620.jpg"
              artist="Yoasobi"
              realeaseDate="2020"
              songTitle="Probably"
              youtubeName="Ayase"
              href="/songs/probably-yoasobi"
            />
          ))}
        </CardWrapper>
      </section>
      <section>
        <TextHeader title="Indonesian Pop Song" />

        <CardWrapper>
          {Array.from({ length: 4 }).map((_, index) => (
            <CardSong
              key={index}
              imageSrc="https://lh3.googleusercontent.com/lkr1V6gP9v3t91jOx1WwAHJW4uBiQo_3VOMyTPF8hQV_-WCrO8Tdhshs05340bzrhZ2nIuotoiVz1ISOXA"
              artist="Arsy Widianto, Tiara Andini"
              realeaseDate="2021"
              songTitle="Cintanya Aku"
              youtubeName="Tiara Andini"
              href="/songs/cintanya-aku-arsy-widianto-tiara-andini"
            />
          ))}
        </CardWrapper>
      </section>
      <section>
        <TextHeader title="Let Explore!" />

        <CardWrapper>
          {Array.from({ length: 20 }).map((_, index) => (
            <CardSong
              key={index}
              imageSrc="https://lh3.googleusercontent.com/lkr1V6gP9v3t91jOx1WwAHJW4uBiQo_3VOMyTPF8hQV_-WCrO8Tdhshs05340bzrhZ2nIuotoiVz1ISOXA"
              artist="Arsy Widianto, Tiara Andini"
              realeaseDate="2021"
              songTitle="Cintanya Aku"
              youtubeName="Tiara Andini"
              href="/songs/cintanya-aku-arsy-widianto-tiara-andini"
            />
          ))}
        </CardWrapper>
      </section>
    </div>
  );
}

export default SongsPage;
