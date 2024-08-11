import { ScrollIcon, SearchIcon, ShuffleIcon, TagsIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function LandingPage() {
  return (
    <div className="min-h-[100dvh]">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Unlock the Secrets of Chord Music
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  chordXploler is your ultimate tool for discovering, analyzing, and mastering chord
                  progressions. Explore the world of music theory and take your playing to new
                  heights.
                </p>
              </div>

              <Button asChild>
                <Link href="/songs">Explore now</Link>
              </Button>
            </div>
            <Image
              src="https://images.unsplash.com/photo-1657721841432-f96e3f7f7eff?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              width="550"
              priority={true}
              height="550"
              alt="Hero"
              className="shadow-primary shadow-md mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
            />
          </div>
        </div>
      </section>
      <section>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            className="fill-muted"
            fillOpacity="1"
            d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
        <div className="w-full py-12 md:py-24 lg:py-28 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="grid gap-4">
                <SearchIcon className="h-12 w-12 text-primary" />
                <h3 className="text-2xl font-bold">Chord Lookup</h3>
                <p className="text-muted-foreground">
                  Quickly find the notes, structure, and variations of any chord.
                </p>
              </div>
              <div className="grid gap-4">
                <ShuffleIcon className="h-12 w-12 text-primary" />
                <h3 className="text-2xl font-bold">Chord Progression</h3>
                <p className="text-muted-foreground">
                  Generate and explore endless chord progressions to inspire your music.
                </p>
              </div>
              <div className="grid gap-4">
                <TagsIcon className="h-12 w-12 text-primary" />
                <h3 className="text-2xl font-bold">Tranpose</h3>
                <p className="text-muted-foreground">
                  Easily change the key of any chord progression to suit your needs.
                </p>
              </div>
              <div className="grid gap-4">
                <ScrollIcon className="h-12 w-12 text-primary" />
                <h3 className="text-2xl font-bold">Auto Scroll</h3>
                <p className="text-muted-foreground">
                  Automatically scroll through your sheet music or lyrics as you play.
                </p>
              </div>
            </div>
          </div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            className="fill-muted"
            fillOpacity="1"
            d="M0,128L48,149.3C96,171,192,213,288,229.3C384,245,480,235,576,197.3C672,160,768,96,864,112C960,128,1056,224,1152,261.3C1248,299,1344,277,1392,266.7L1440,256L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            What Our Users Say
          </h2>
          <p className="max-w-[700px] mx-auto mt-4 text-muted-foreground md:text-xl">
            Hear from real musicians who have used ChordXplorer to enhance their musical journey.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="text-left">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-primary text-primary-foreground w-10 h-10 flex items-center justify-center">
                    JD
                  </div>
                  <div>
                    <div className="font-medium">John Doe</div>
                    <div className="text-sm text-muted-foreground">Musician</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p>
                  &quot;ChordXplorer has been a game-changer for my songwriting.\n The chord lookup
                  and progression tools have helped me\n discover new harmonies and take my music to
                  the next\n level.&quot;
                </p>
              </CardContent>
            </Card>
            <Card className="text-left">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-primary text-primary-foreground w-10 h-10 flex items-center justify-center">
                    SM
                  </div>
                  <div>
                    <div className="font-medium">Sarah Miller</div>
                    <div className="text-sm text-muted-foreground">Music Producer</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p>
                  &quot;As a producer, I rely on ChordXplorer to quickly\n understand the chord
                  structures in the music I&apos;m\n working on. The analysis tools have been
                  invaluable for\n my workflow.&quot;
                </p>
              </CardContent>
            </Card>
            <Card className="text-left">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-primary text-primary-foreground w-10 h-10 flex items-center justify-center">
                    TW
                  </div>
                  <div>
                    <div className="font-medium">Tom Wilson</div>
                    <div className="text-sm text-muted-foreground">Music Student</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p>
                  &quot;As a music student, ChordXplorer has been an\n indispensable tool for
                  learning and understanding\n chord theory. The intuitive interface and wealth of\n
                  information have made it a crucial part of my\n studies.&quot;
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Start Exploring Chord Music Today
          </h2>
          <p className="max-w-[700px] mx-auto mt-4 text-muted-foreground md:text-xl">
            Sign up for create chords.
          </p>
          <Button
            className="mt-8"
            asChild
          >
            <Link
              href="/auth/login"
              prefetch={false}
            >
              Sign Up for Free
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
