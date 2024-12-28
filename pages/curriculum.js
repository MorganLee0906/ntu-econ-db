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
                        {allPostsData.map(({ id, fcnt, title, fid }) => {
                            const hasFiles = fcnt > 0;
                            const linkProps = hasFiles
                                ? { href: `/folder/${id}/${fid}`, className: "list-group-item list-group-item-action" }
                                : {
                                    className: "list-group-item list-group-item-action disabled text-muted",
                                    title: "此資料夾無檔案"
                                };
                            return (
                                <a key={id} {...linkProps}>
                                    <div class="d-flex w-100 justify-content-begin">
                                        <h5 class="mb-1">{title}</h5>
                                    </div>
                                    <div class="d-flex justify-content-end">
                                        {hasFiles ? (
                                            <span class="badge bg-primary me-2 align-items-center">
                                                共有{fcnt}個檔案
                                            </span>
                                        ) : (
                                            <span class="badge bg-secondary me-2 align-items-center">
                                                本課程暫無檔案
                                            </span>
                                        )}
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                </div>

            </Layout >
        </div >
    );
}
