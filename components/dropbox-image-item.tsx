"use client";

import { IconButton } from "@material-tailwind/react";
import { getImageUrl } from "utils/supabase/storage";
import { useMutation } from "@tanstack/react-query";
import { deleteFile } from "actions/storage-actions";
import { queryClient } from "config/ReactQueryClientProvider";
import { Spinner } from "@material-tailwind/react";

export default function DropboxImageItem({ image }) {
  console.log(image);

  const deleteFileMutation = useMutation({
    mutationFn: deleteFile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["images"],
      });
    },

    onError: (err) => {
      console.log("useMutation error:", err);
    },
  });
  return (
    <div className="w-full flex flex-col border p-2 rounded-2xl shadow-md relative">
      {/* Image */}
      <div>
        <img
          src={getImageUrl(image.name)}
          className="w-full aspect-square rounded-2xl"
        />
      </div>
      {/* FileName */}
      <div>{image.name}</div>
      {/* 휴지통 아이콘 버튼 */}
      <div className="absolute top-4 right-4">
        <IconButton
          color="red"
          onClick={() => {
            console.log("IconButton clicked ");
            if (confirm("삭제 하시겠습니까 ?")) {
              deleteFileMutation.mutate(image.name);
            }
          }}
        >
          {deleteFileMutation.isPending ? (
            <Spinner />
          ) : (
            <i className="fas fa-trash"></i>
          )}
        </IconButton>
      </div>
    </div>
  );
}
