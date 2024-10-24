"use client";

import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";

// type ResponseType = {
//   id: string;
//   cover_image: string;
//   songs_title: string;
//   artist: {
//     artist_id: string;
//     artist_name: string;
//   }[];
//   release_year: string;
//   album: string;
//   publisher: string;
// };

type ResponseType = any;

export const columns: ColumnDef<ResponseType>[] = [
  {
    accessorKey: "cover_image",
    header: () => <div className="text-center">Cover</div>,
    cell: ({ row }) => (
      <div className="relative mx-auto aspect-square size-9">
        <Image
          src={row.getValue("cover_image")}
          alt="profile"
          fill
          className="object-cover"
        />
      </div>
    ),
    size: 50,
  },
  {
    accessorKey: "songs_title",
    header: () => {
      return <div className="text-left">Title</div>;
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("songs_title")}</div>
    ),
  },
  {
    accessorKey: "artists",
    header: () => {
      return <div className="text-left">Artist</div>;
    },
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("artists")}</div>;
    },
  },
  {
    accessorKey: "release_year",
    header: () => {
      return <div className="text-left">Release</div>;
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("release_year")}</div>
    ),
  },
  {
    accessorKey: "album",
    header: () => {
      return <div className="text-left">Album</div>;
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("album")}</div>
    ),
  },
  {
    accessorKey: "publisher",
    header: () => {
      return <div className="text-left">Publisher</div>;
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("publisher")}</div>
    ),
  },
];
