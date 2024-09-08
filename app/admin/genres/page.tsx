"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { TitleTable } from "./title";
import { Button } from "@/components/ui/button";

export default function GenresAdminPage() {
  return (
    <>
      <div className="my-5 flex justify-start">
        <Button>Add Genre</Button>
      </div>
      <Table className="border">
        <TableCaption>A list of genres.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Name</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Created by</TableHead>
            <TableHead className="text-right">Created At</TableHead>
            <TableHead className="text-right">Updated At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TitleTable genreId="" initialTitle="Romance" />
            <TableCell>/romance</TableCell>
            <TableCell>$250.00</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
          <TableRow>
            <TitleTable genreId="" initialTitle="Pop" />
            <TableCell>/pop</TableCell>
            <TableCell>$250.00</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
}
