import React from "react";
import DropboxImageItem from "./dropbox-image-item";
import { useMutation, useQuery } from "@tanstack/react-query";
import { searchFiles } from "actions/storage-actions";
import { Spinner } from "@material-tailwind/react";

export default function DropboxImageList({ searchInput }) {
  const searchImgQuery = useQuery({
    queryKey: ["images", searchInput],
    queryFn: () => searchFiles(searchInput),
  });

  return (
    <div className="grid md:grid-cols-3 lg:grid-cols-4 grid-cols-2 gap-2 ">
      {searchImgQuery.isLoading && (
        <p>
          <Spinner />
        </p>
      )}

      {searchImgQuery.data &&
        searchImgQuery.data.map((image) => (
          <DropboxImageItem key={image.id} image={image} />
        ))}
    </div>
  );
}
