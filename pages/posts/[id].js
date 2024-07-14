import Head from 'next/head';
import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/post';
import Date from '../../components/date';

export default function Post({ postData }) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <div class="container">
                <h2 className="mt-3 mb-2">{postData.title}</h2>
                <span className="badge bg-secondary"><Date dateString={postData.date} /></span>
                <div className="mt-3 mb-3" dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </div>
        </Layout>
    );
}

export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id);

    return {
        props: {
            postData,
        },
    };
}