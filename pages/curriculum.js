import Head from 'next/head';
import Layout from '../components/layout';
import { getSortedPostsData } from '../lib/curriculum';

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
                        {allPostsData.map(({ id, cnum, title, fid }) => (
                            <a
                                href={`/folder/${id}?fid=${fid}`}
                                class="list-group-item list-group-item-action"
                                key={id}
                            >
                                <div class="d-flex w-100 justify-content-begin">
                                    <h5 class="mb-1">{title}</h5>
                                </div>
                                <div class="d-flex justify-content-end">
                                    {cnum.split(', ').map((c) => (
                                        <span class="badge bg-primary me-2 align-items-center">{c}</span>
                                    ))}
                                </div>
                            </a>
                        ))}
                    </div>
                </div>

            </Layout >
        </div >
    );
}
