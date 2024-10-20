"use client";

import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";

type ResponseType = {
  id: string;
  artist_name: string;
  artist_image: string;
  artist_bio: string | null;
  created_at: string;
  updated_at: string;
};

export const columns: ColumnDef<ResponseType>[] = [
  {
    accessorKey: "artist_image",
    header: () => <div className="text-center">Picture</div>,
    cell: ({ row }) => (
      <div className="relative mx-auto aspect-square size-9">
        <Image
          src={row.getValue("artist_image")}
          alt="profile"
          fill
          className="rounded-full object-cover"
        />
      </div>
    ),
    size: 32,
  },
  {
    accessorKey: "artist_name",
    header: () => {
      return <div className="text-left">Name</div>;
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("artist_name")}</div>
    ),
  },
  {
    accessorKey: "artist_bio",
    header: () => <div className="text-left">Bio</div>,
    cell: ({ row }) => {
      return (
        <div className="overflow-hidden truncate">
          {row.getValue("artist_bio") ? row.getValue("artist_bio") : "-"}
        </div>
      );
    },
  },
];
