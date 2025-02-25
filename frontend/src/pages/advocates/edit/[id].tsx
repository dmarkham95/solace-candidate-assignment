import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import Head from 'next/head';


const EditAdvocatePage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const postId = id ? parseInt(id as string, 10) : undefined;

  if (!postId) {
    return (
      <div className="container mx-auto py-8">
        <p>Invalid Advocate ID</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Edit Advocate</title>
      </Head>
      <div className="container mx-auto py-8">
        <div>Edit Form Goes here</div>
      </div>
    </>
  );
};

export default EditAdvocatePage;