export default function SongsPage({ params }: { params: { slug: string } }) {
  return <div className="min-h-screen">song = {params.slug}</div>;
}
