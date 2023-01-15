import AddNewPost from "./components/FormComponents/AddNewPost";
import PostsList from "./components/posts/PostsList";
import { Route, Routes } from "react-router-dom";
import Layout from "./organisms/Layout";
import EditPostForm from "./components/FormComponents/EditPostForm";
import FullPostPage from "./components/posts/FullPostPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostsList />} />
        <Route path="/post" element={<AddNewPost />} />

        <Route path="post">
          <Route path=":postId" element={<FullPostPage />} />
          <Route path=":postId/edit" element=<EditPostForm /> />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

{
  /* <main>
      <AddNewPost />
      <PostsList />
    </main> */
}
