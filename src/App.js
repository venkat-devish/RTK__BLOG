import { Route, Routes } from "react-router";
import AddPostForm from "./components/AddPostForm";
import EditPostForm from "./components/EditPostForm";
import FullPost from "./components/FullPost";
import PostsList from "./components/PostsList";
import Layout from "./organisms/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostsList />} />

        <Route path="post">
          <Route index element={<AddPostForm />} />
          <Route path=":postId" element={<FullPost />} />
          <Route path="edit/:postId" element={<EditPostForm />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
