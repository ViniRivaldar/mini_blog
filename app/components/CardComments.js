"use client";

import { useEffect } from "react";
import useCommentsStore from "@/store/CommentStore";
import Comment from "./Comment";
import FormsComments from "./FormsComments";

export default function CardComments() {
  const { comments, fetchComments, loading, error } = useCommentsStore();

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return (
    <div className="w-[1192px] bg-[#D3D3D3] mb-10 p-10">
      <p className="text-[#070D21] text-center font-anton text-[48px] font-normal leading-none">
        Comentários
      </p>

      <FormsComments />

      {loading && <p className="text-center mt-4">Carregando comentários...</p>}
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}

      {comments.length > 0 ? (
        comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))
      ) : (
        !loading && <p className="text-center mt-4">Nem um comentário.</p>
      )}
    </div>
  );
}
