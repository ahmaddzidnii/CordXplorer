import { CardSong } from "@/components/card-song";

export default function ChordPage() {
  return (
    <>
      {/* <section className="min-h-screen pt-4 flex justify-center items-center">
        <div className="flex flex-col items-center space-y-5">
          <div className="bg-violet-600 w-[300px] h-[300px] relative rounded-2xl">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY5MOwMxuu-7YUCDTTsULmVbzUipMUEa7yOQ&usqp=CAU"
              alt="Music"
              className="rounded-full w-full h-full absolute top-0"
            />
          </div>
          <h1 className="text-4xl font-bold text-center">
            Jelajahi Dunia Chord dengan cepat. 🎼
          </h1>
        </div>
      </section> */}

      <section>
        <h1 className="font-bold text-4xl py-5">Japanese Song</h1>
        <div className="grid grid-cols-12 gap-2">
          <CardSong
            imageSrc="https://www.kawaiikakkoiisugoi.com/wp-content/uploads/2020/07/YOASOBI-Tabun-620x620.jpg"
            artist="Yoasobi"
            realeaseDate="2020"
            songTitle="Probably"
            youtubeName="Ayase"
            href="/songs/probably-yoasobi"
          />
        </div>
      </section>
      <section>
        <h1 className="font-bold text-4xl py-5">Pop Indonesia Song</h1>
        <div className="grid grid-cols-12 gap-2">
          <CardSong
            imageSrc="https://lh3.googleusercontent.com/lkr1V6gP9v3t91jOx1WwAHJW4uBiQo_3VOMyTPF8hQV_-WCrO8Tdhshs05340bzrhZ2nIuotoiVz1ISOXA"
            artist="Arsy Widianto, Tiara Andini"
            realeaseDate="2021"
            songTitle="Cintanya Aku"
            youtubeName="Tiara Andini"
            href="/songs/cintanya-aku-arsy-widianto-tiara-andini"
          />
        </div>
      </section>
    </>
  );
}
