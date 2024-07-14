import Head from 'next/head';
import Layout from '../../components/layout';
import { getSortedPostsData } from '../../lib/post';

export async function getStaticProps() {
    const allPostsData = getSortedPostsData();
    return {
        props: {
            allPostsData,
        },
    };
}
export default function Home({ allPostsData }) {
    return (
        <div>
            <Head>
                <title>課程</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout>
                <div className="container" style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100px'
                }}>
                    <h2>課程</h2>
                </div>
                <div class="container">
                    <div class="list-group">
                        {allPostsData.map(({ id, date, title }) => (
                            <a
                                href={`/posts/${id}`}
                                class="list-group-item list-group-item-action"
                                key={id}
                            >
                                <div class="d-flex w-100 justify-content-between">
                                    <h5 class="mb-1">{title}</h5>
                                    <small>{date}</small>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>

            </Layout >
        </div >
    );
}
