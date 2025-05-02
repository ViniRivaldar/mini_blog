import CardComments from "@/app/components/CardComments";
import CardPost from "@/app/components/CardPost";

export default function PostPage({ params }) {
  
    return (
      <>
        <CardPost/>
        <CardComments/>
      </>
    );
}